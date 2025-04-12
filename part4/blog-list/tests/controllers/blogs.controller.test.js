const {test, describe, before, after} = require('node:test')
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");

const api = supertest(app);

const Blog = require("../../models/blog.model");
const assert = require("node:assert");

describe("GET /blogs", () => {
    const blog1 = {
        title: "Blog 1",
        author: "Author 1",
        url: "http://example.com/1",
        likes: 10,
    }
    const blog2 = {
        title: "Blog 2",
        author: "Author 2",
        url: "http://example.com/2",
        likes: 20,
    }

    before(async () => {
        await Blog.deleteMany({});
        await (new Blog(blog1)).save();
        await (new Blog(blog2)).save();
    });

    test("should return all blogs", async () => {
        const response = await api.get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        assert.strictEqual(response.body.length, 2);
        assert.strictEqual(response.body[0].name, blog1.name);
        assert.strictEqual(response.body[1].name, blog2.name);
    });

    test("should return a blog with an id field", async () => {
        const response = await api.get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        assert.notStrictEqual(response.body[0].id, undefined);
        assert.strictEqual(response.body[0]._id, undefined);
    });

    assert(async () => {
        await mongoose.connection.close();
    });
})
