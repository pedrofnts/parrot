import request from "supertest";
import app from "../../src/app";
import { AppDataSource } from "../../src/data-source";
import jwt from "jsonwebtoken";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  AppDataSource.close();
});

it("simple test", () => {
  expect(1 + 1).toBe(2);
});

it("deveria logar com sucesso", async () => {
  const response = await request(app).post("/login").send({
    email: "a@a.com",
    password: "101010",
  });
  console.log(response.body);
  expect(response.status).toBe(200);
});

it("deveria listar todos os usuários", async () => {
  const response = await request(app)
    .get("/users")
    .set("Authorization", "token");
  console.log(response.body);
  expect(response.status).toBe(200);
});
