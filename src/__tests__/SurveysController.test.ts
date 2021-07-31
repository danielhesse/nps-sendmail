import request from "supertest";
import { app } from "../app";

import createConnection from "../database";

describe("Surveys Controller Flow", () => {
  beforeAll(async () => {
    const connection = await createConnection();

    await connection.runMigrations();
  });

  it("should be able to create a new survey", async () => {
    const response = await request(app).post("/surveys").send({
      title: "This is a title example",
      description: "This is a description example",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should be able to list all surveys", async () => {
    await request(app).post("/surveys").send({
      title: "This is a title example to list",
      description: "This is a description example to list",
    });

    const response = await request(app).get("/surveys");

    expect(response.body.length).toBe(2);
  });
});
