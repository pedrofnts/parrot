import request from "supertest";
import app from "../../src/app";
import { AppDataSource } from "../../src/data-source";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  AppDataSource.close();
});

it("deveria logar com sucesso", async () => {
  const response = await request(app).post("/login").send({
    email: "administrator@parrot.com",
    password: "123456",
  });
  expect(response.status).toBe(200);
});

it("deveria não permitir o login de usuário com credenciais erradas", async () => {
  const response = await request(app).post("/login").send({
    email: "ola@ola.com",
    password: "10101043",
  });
  expect(response.status).toBe(404);
});
