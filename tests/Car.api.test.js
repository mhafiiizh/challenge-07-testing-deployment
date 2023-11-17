const request = require("supertest");
const app = require("../app");
// const baseURL = "http://localhost:8000"
const dotenv = require("dotenv");
dotenv.config();

// describe("Dog", () => {
//     it("should have name called 'Arnold'", () => {
//         const dog = new Dog("Arnold");

//         expect(dog).toHaveProperty("name", "Arnold");
//     });

//     it("should be able to bark and return 'Woof!'", () => {
//         const dog = new Dog("Arnold");
//         expect(dog.bark()).toEqual("Woof!");
//     });
// });

// describe("API get all cars", () => {
//     it("success get all data cars", (done) => {
//         request(app)
//             .get("/v1/cars")
//             .expect(200, done);
//     });
// });

const getToken = async (credentials) => {
  const check = await request(app).post("/v1/auth/login").send(credentials);
  const res = JSON.parse(check.text);
  return res.accessToken;
};

describe("API route not found", () => {
  it("Route not found", async () => {
    const response = await request(app).get("/v1/carss");
    expect(response.statusCode).toBe(404);
  });
});

describe("API test server", () => {
  it("success test server", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("API get all cars", () => {
  it("success get all data cars", async () => {
    const response = await request(app).get("/v1/cars");
    expect(response.statusCode).toBe(200);
  });
});

describe("API get car By ID", () => {
  it("success get data car", async () => {
    const response = await request(app).get("/v1/cars/20");
    expect(response.statusCode).toBe(200);
  });
});

describe("API create car", () => {
  it("create data car with valid token", async () => {
    const car = {
      name: "Huhuhuhu",
    };
    const token = await getToken({
      email: "admin@binar.co.id",
      password: "123456",
    });
    const response = await request(app)
      .post("/v1/cars")
      .set("Authorization", `Bearer ${token}`)
      .send(car);
    expect(response.statusCode).toBe(201);
  });
  it("failed create data car with invalid token", async () => {
    const car = {
      name: "Huhuhuhu",
    };
    const token = await getToken({
      email: "john@binar.co.id",
      password: "123456",
    });
    const response = await request(app)
      .post("/v1/cars")
      .set("Authorization", `Bearer ${token}`)
      .send(car);
    expect(response.statusCode).toBe(401);
  });
  it("failed create data car", async () => {
    const car = {
      name: "Huhuhuhu",
    };
    const token = await getToken({
      name: "admin@binar.co.id",
      password: "123456",
    });
    const response = await request(app)
      .post("/v1/cars")
      .set("Authorization", `Bearer ${token}`)
      .send(car);
    expect(response.statusCode).toBe(401);
  });
});

describe("API update car By ID", () => {
  it("failed update data car with valid token", async () => {
    const car = {
      name: "Huhuhuhu",
    };
    const token = await getToken({
      email: "admin@binar.co.id",
      password: "123456",
    });
    const response = await request(app)
      .put("/v1/cars/20")
      .set("Authorization", `Bearer ${token}`)
      .send(car);
    expect(response.statusCode).toBe(200);
  });
  it("failed delete data car with invalid token", async () => {
    const car = {
      name: "Huhuhuhu",
    };
    const token = await getToken({
      email: "fikri@binar.co.id",
      password: "123456",
    });
    const response = await request(app)
      .put("/v1/cars/20")
      .set("Authorization", `Bearer ${token}`)
      .send(car);
    expect(response.statusCode).toBe(401);
  });
  it("failed update data car", async () => {
    const car = {
      name: "Huhuhuhu",
    };
    const token = await getToken({
      name: "fikri@binar.co.id",
      password: "123456",
    });
    const response = await request(app)
      .put("/v1/cars/20")
      .set("Authorization", `Bearer ${token}`)
      .send(car);
    expect(response.statusCode).toBe(401);
  });
});

describe("API delete car By ID", () => {
  it("success delete data car with valid token", async () => {
    const token = await getToken({
      email: "admin@binar.co.id",
      password: "123456",
    });
    const response = await request(app)
      .delete("/v1/cars/20")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(204);
  });
  it("failed delete data car with invalid token", async () => {
    const token = await getToken({
      email: "john@binar.co.id",
      password: "123456",
    });
    const response = await request(app)
      .delete("/v1/cars/20")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(401);
  });
  it("failed delete data car", async () => {
    const token = await getToken({
      name: "john@binar.co.id",
      password: "123456",
    });
    const response = await request(app)
      .delete("/v1/cars/20")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(401);
  });
});
