const request = require("supertest");
const app = require("../app");
const dotenv = require("dotenv");
dotenv.config();

describe("API Login", () => {
  it("success login", async () => {
    const user = {
      email: "fikri@binar.co.id",
      password: "123456",
    };
    const response = await request(app).post("/v1/auth/login").send(user);
    expect(response.statusCode).toBe(201);
  });

  it("failed login : wrong password", async () => {
    const failedUser = {
      email: "fikri@binar.co.id",
      password: "1234656",
    };
    const response = await request(app).post("/v1/auth/login").send(failedUser);
    expect(response.statusCode).toBe(401);
  });

  it("failed login : email not registered", async () => {
    const failedUser = {
      email: "Fikri@binasr.co.id",
      password: "1234656",
    };
    const response = await request(app).post("/v1/auth/login").send(failedUser);
    expect(response.statusCode).toBe(404);
  });
});

describe("API Register", () => {
  it("success register", async () => {
    const user = {
      name: "Hihi",
      email: "pppp@binar.co.id",
      password: "123456",
    };
    const response = await request(app).post("/v1/auth/register").send(user);
    expect(response.statusCode).toBe(201);
  });
  it("failed register: email already registered", async () => {
    const failedUser = {
      name: "Hihi",
      email: "fikri@binar.co.id",
      password: "123456",
    };
    const response = await request(app)
      .post("/v1/auth/register")
      .send(failedUser);
    expect(response.statusCode).toBe(422);
  });
  it("failed register: password not provided", async () => {
    const failedUser = {
      name: "Hihi",
      email: "asd@binar.co.id",
    };
    const response = await request(app)
      .post("/v1/auth/register")
      .send(failedUser);
    expect(response.statusCode).toBe(500);
  });
});

describe("API Get user", () => {
  it("success get user", async () => {
    const user = {
      email: "fikri@binar.co.id",
      password: "123456",
    };
    const check = await request(app).post("/v1/auth/login").send(user);
    const res = JSON.parse(check.text);
    const token = res.accessToken;
    const response = await request(app)
      .get("/v1/auth/whoami")
      .set(`Authorization`, `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});
