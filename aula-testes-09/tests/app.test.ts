import supertest from "supertest";

import app from "../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const user = {
      email: "alice@prisma.io",
      name: 'alice',
    }

    const response = await  api.post('/users').send(user)

    expect(response.status).toBe(201)
    expect(response.body.id).toBeGreaterThan(0);
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    const user = {
      email: "alice@prisma.io",
      name: "Alice"
    }
    await api.post('/users').send(user)
    const response = await api.post("/users").send(user);
    expect(response.status).toBe(409);
  });

});

describe("GET /users tests", () => {

  let createUser;

  it("should return a single user", async () => {
    const user = {
      email: "alice@prisma.io",
      name: "Alice",
    };

    const createUserResponse = await api.post("/users").send(user);
    createUser = createUserResponse.body
 
    const response = await api.get(`/users/${createUser.id}`);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(user.email);
  });

  it("should return 404 when can't find a user by id", async () => {
    const response = await api.get("/users/1");
    expect(response.status).toBe(404);

  });

  it("should return all users", async () => {
    const users = await api.get("/users");

    expect(users.status).toBe(200);
    expect(users.body.length).toBeGreaterThan(0);
  });

})