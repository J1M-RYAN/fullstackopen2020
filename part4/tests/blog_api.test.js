const mongoose = require("mongoose")
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

test("blogs are successfully returned", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
})

afterAll(() => {
    mongoose.connection.close();
})