const {test, describe, before, after} = require('node:test')
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");

const api = supertest(app);

const User = require("../../models/user.model");
const assert = require("node:assert");

describe("/users", () => {
    const user1 = {
        username: "user1",
        name: "User One",
        password: "password1",
    }

    const user2 = {
        username: "user2",
        name: "User Two",
        password: "password2",
    }

    before(async () => {
        await User.deleteMany({});
        await (new User(user1)).save();
        await (new User(user2)).save();
    })

    describe("GET", () => {
        test("should return all users", async () => {
            const response = await api.get("/api/users")
                .expect(200)
                .expect("Content-Type", /application\/json/);
            assert.strictEqual(response.body.length, 2);
            assert.strictEqual(response.body[0].username, user1.username);
            assert.strictEqual(response.body[1].username, user2.username);
            assert.strictEqual(response.body[0].password, undefined);
            assert.strictEqual(response.body[1].password, undefined);
        })

        test("should return a user with an id field", async () => {
            const response = await api.get("/api/users")
                .expect(200)
                .expect("Content-Type", /application\/json/);
            assert.notStrictEqual(response.body[0].id, undefined);
            assert.strictEqual(response.body[0]._id, undefined);
        })
    })

    describe("POST", () => {
        test("should create a new user", async () => {
            const newUser = {
                username: "newuser",
                name: "New User",
                password: "newpassword",
            }
            const response = await api.post("/api/users")
                .send(newUser)
                .expect(201)
                .expect("Content-Type", /application\/json/);
            assert.strictEqual(response.body.username, newUser.username);
            assert.strictEqual(response.body.name, newUser.name);
            assert.strictEqual(response.body.password, undefined);
        })

        test("should return 400 if username is missing", async () => {
            const newUser = {
                name: "New User",
                password: "newpassword",
            }
            const response = await api.post("/api/users")
                .send(newUser)
                .expect(400)
                .expect("Content-Type", /application\/json/);
            assert.strictEqual(response.body.error, "username missing");
        })

        test("should return 400 if password is missing", async () => {
            const newUser = {
                username: "newuser",
                name: "New User",
            }
            const response = await api.post("/api/users")
                .send(newUser)
                .expect(400)
                .expect("Content-Type", /application\/json/);
            assert.strictEqual(response.body.error, "password missing");
        })

        test("should return 400 if password is less than 3 symbols", async () => {
            const newUser = {
                username: "newuser",
                name: "New User",
                password: "pw",
            }
            const response = await api.post("/api/users")
                .send(newUser)
                .expect(400)
                .expect("Content-Type", /application\/json/);
            assert.strictEqual(response.body.error, "password must be at least 3 characters long");
        })

        test("should return 400 if username already exists", async () => {
            const newUser = {
                username: user1.username,
                name: "New User",
                password: "newpassword",
            }
            const response = await api.post("/api/users")
                .send(newUser)
                .expect(400)
                .expect("Content-Type", /application\/json/);
            assert.strictEqual(response.body.error, "username already exists");
        })
    })

    after(async () => {
        await mongoose.connection.close();
    })

})