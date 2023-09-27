import supertest from "supertest";

import app from "./../src/app";
import { request, response } from "express";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  })


  it('should calculate fibonacci sequence', async () => {
    const result = await api.get('/fibonacci?elements=5')
    expect(result.status).toBe(200);
    expect(result.body).toEqual([0,1,1,2,3])
  })


  it('shoud return status 400 to invalid elements', async () => {
    const result = await api.get('/fibonacci?elements=invalid')
    expect(result.status).toBe(400)
  })
})