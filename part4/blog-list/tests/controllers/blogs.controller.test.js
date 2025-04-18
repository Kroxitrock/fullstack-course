const {test, describe, before, after} = require('node:test')
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const bcrypt = require("bcrypt");

const api = supertest(app);

const Blog = require("../../models/blog.model");
const User = require("../../models/user.model");
const assert = require("node:assert");

describe("/blogs", () => {
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
    const user = {
        username: "testuser",
        password: "testpassword",
        name: "Test User",
    }

    before(async () => {
        await User.deleteMany({})
        user.password = await bcrypt.hash(user.password, 10);
        const savedUser = await (new User(user)).save();
        blog1.user = savedUser.id;
        blog2.user = savedUser.id;
        await Blog.deleteMany({});
        await (new Blog(blog1)).save();
        await (new Blog(blog2)).save();
    });

    describe("GET ", () => {
        test("should return all blogs", async () => {
            const response = await api.get("/api/blogs")
                .expect(200)
                .expect("Content-Type", /application\/json/);
            assert.strictEqual(response.body.length, 2);
            assert.strictEqual(response.body[0].name, blog1.name);
            assert.strictEqual(response.body[1].name, blog2.name);
            assert.strictEqual(response.body[0].user.username, user.username);
            assert.strictEqual(response.body[1].user.username, user.username);
            assert.strictEqual(response.body[0].user.password, undefined);
            assert.strictEqual(response.body[1].user.password, undefined);
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
    });

    describe("POST ", () => {

        let bearerToken;
        before(async () => {
            const response = await api.post("/api/users/login")
                .send({ username: user.username, password: "testpassword" });
            bearerToken = `Bearer ${response.body.token}`;
        })

        test("should create a new blog", async () => {
            const newBlog = {
                title: "New Blog",
                author: "New Author",
                url: "http://example.com/new",
                likes: 5,
            }

            const response = await api.post("/api/blogs")
                .set("Authorization", bearerToken)
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            const createdBlog = response.body;
            assert.notStrictEqual(createdBlog.id, undefined);
            assert.strictEqual(createdBlog.title, newBlog.title);
            assert.strictEqual(createdBlog.author, newBlog.author);
            assert.strictEqual(createdBlog.url, newBlog.url);
            assert.strictEqual(createdBlog.likes, newBlog.likes);
        });

        test("should set likes to 0 if not provided", async () => {
            const newBlog = {
                title: "New Blog",
                author: "New Author",
                url: "http://example.com/new",
            }

            const response = await api.post("/api/blogs")
                .set("Authorization", bearerToken)
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            const createdBlog = response.body;
            assert.strictEqual(createdBlog.likes, 0);
        })

        test("should return 400 if title is missing missing", async () => {
            const newBlog = {
                author: "New Author",
                url: "http://example.com/new",
            }

            await api.post("/api/blogs")
                .set("Authorization", bearerToken)
                .send(newBlog)
                .expect(400)
                .expect("Content-Type", /application\/json/);
        })

        test("should return 400 if url is missing missing", async () => {
            const newBlog = {
                title: "New Blog",
                author: "New Author",
            }

            await api.post("/api/blogs")
                .set("Authorization", bearerToken)
                .send(newBlog)
                .expect(400)
                .expect("Content-Type", /application\/json/);
        })

        test("should return 401 if token is missing", async () => {
            await api.post("/api/blogs")
                .expect(401)
                .expect("Content-Type", /application\/json/);
        })
    })

    describe("DELETE ", () => {
        let bearerToken;
        before(async () => {
            const response = await api.post("/api/users/login")
                .send({ username: user.username, password: "testpassword" });
            bearerToken = `Bearer ${response.body.token}`;
        })

        test("should return 404 if blog not found", async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            await api.delete(`/api/blogs/${nonExistentId}`)
                .expect(404)
                .expect("Content-Type", /application\/json/);
        })

        test("should return 401 if token is missing", async () => {
            const blogsBefore = await api.get("/api/blogs");
            const blogToDelete = blogsBefore.body[0];

            await api.delete(`/api/blogs/${blogToDelete.id}`)
                .expect(401)
                .expect("Content-Type", /application\/json/);
        })

        test("should delete a blog", async () => {
            const blogsBefore = await api.get("/api/blogs");
            const blogToDelete = blogsBefore.body[0];

            await api.delete(`/api/blogs/${blogToDelete.id}`)
                .set("Authorization", bearerToken)
                .expect(204);

            const blogsAfter = await api.get("/api/blogs");
            assert.strictEqual(blogsAfter.body.length, blogsBefore.body.length - 1);
            assert.strictEqual(blogsAfter.body.find(blog => blog.id === blogToDelete.id), undefined);
        })
    })

    describe("PUT ", () => {

        test("should return 400 if title is missing", async () => {
            const blogsBefore = await api.get("/api/blogs");
            const blogToUpdate = blogsBefore.body[0];
            blogToUpdate.user = blogToUpdate.user.id;

            blogToUpdate.title = undefined;

            await api.put(`/api/blogs/${blogToUpdate.id}`)
                .send(blogToUpdate)
                .expect(400)
                .expect("Content-Type", /application\/json/);
        })

        test("should return 400 if url is missing", async () => {
            const blogsBefore = await api.get("/api/blogs");
            const blogToUpdate = blogsBefore.body[0];
            blogToUpdate.user = blogToUpdate.user.id;

            blogToUpdate.url = undefined;

            await api.put(`/api/blogs/${blogToUpdate.id}`)
                .send(blogToUpdate)
                .expect(400)
                .expect("Content-Type", /application\/json/);
        })

        test("should return 404 if blog not found", async () => {
            const blogsBefore = await api.get("/api/blogs");
            const blogToUpdate = blogsBefore.body[0];
            blogToUpdate.user = blogToUpdate.user.id;

            const nonExistentId = new mongoose.Types.ObjectId();

            await api.put(`/api/blogs/${nonExistentId}`)
                .send(blogToUpdate)
                .expect(404)
                .expect("Content-Type", /application\/json/);
        })

        test('should update a blog', async () => {
            const blogsBefore = await api.get("/api/blogs");
            const blogToUpdate = blogsBefore.body[0];
            blogToUpdate.user = blogToUpdate.user.id;

            blogToUpdate.likes++;

            const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
                .send(blogToUpdate)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            assert.strictEqual(response.body.likes, blogToUpdate.likes);
        })

        test("should update likes to 0 if likes are missing", async () => {
            const blogsBefore = await api.get("/api/blogs");
            const blogToUpdate = blogsBefore.body[0];
            blogToUpdate.user = blogToUpdate.user.id;

            blogToUpdate.likes = undefined;

            const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
                .send(blogToUpdate)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            assert.strictEqual(response.body.likes, 0);
        })
    })

    after(async () => {
        await mongoose.connection.close();
    })

})
