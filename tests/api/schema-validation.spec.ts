import { test, expect, request } from "@playwright/test";

test.describe("POST /objects - Schema Validation", () => {
  test("API-TC-008: Response matches schema", async ({ request }) => {
    const payload = {
      name: "Apple MacBook Pro 16",
      data: {
        year: 2019,
        price: 1849.99,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB",
      },
    };
    const response = await request.post("https://api.restful-api.dev/objects", {
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const body = await response.json();
    expect(typeof body.id).toBe("string");
    expect(body.name).toBe(payload.name);
    expect(typeof body.data).toBe("object");
    expect(body.data).toEqual(payload.data);
    expect(["string", "number"]).toContain(typeof body.createdAt);
    // ISO 8601 check
    expect(new Date(body.createdAt).toISOString()).toBe(body.createdAt);
  });
});