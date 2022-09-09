import request from "supertest";
import app from "../../src/app";
import { AppDataSource } from "../../src/data-source";

var token = "";

beforeAll(async () => {
  await AppDataSource.initialize();
  const response = await request(app).post("/login").send({
    email: "administrator@parrot.com",
    password: "123456",
  });
  token = response.body.token;
});

afterAll(() => {
  AppDataSource.close();
});

it("deveria listar todos os posts", async () => {
  const response = await request(app)
    .get("/feed")
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(200);
});

it("deveria criar um post", async () => {
  const response = await request(app)
    .post("/profile/newpost")
    .send({ content: "Administrator 2" })
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(201);
});

it("deveria remover um post", async () => {
  const response = await request(app)
    .delete("/feed/1/delete")
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(200);
});
