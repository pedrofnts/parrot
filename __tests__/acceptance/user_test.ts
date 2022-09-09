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

it("deveria listar todos os usuários", async () => {
  const response = await request(app)
    .get("/profiles")
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(2);
});

it("deveria editar um usuário", async () => {
  const response = await request(app)
    .put("/profile/edit")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Administrator 2",
      email: "administrator@parrot.com",
      password: "123456",
    });
  expect(response.status).toBe(200);
  expect(response.body).toStrictEqual({
    message: "Perfil atualizado com sucesso",
  });
});

it("deveria não permitir a edição de usuário sem autenticação", async () => {
  const response = await request(app).put("/profile/edit").send({
    name: "Administrator 2",
    email: "administrator@parrot.com",
    password: "123456",
  });
  expect(response.status).toBe(401);
});

it("deveria criar um usuário", async () => {
  const response = await request(app).post("/register").send({
    name: "Moderador",
    email: "moderador@parrot.com",
    apartment: 12,
    password: "123456",
  });
  expect(response.status).toBe(201);
  expect(response.body).toBe("Usuário Moderador cadastrado com sucesso");
});
