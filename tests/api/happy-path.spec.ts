import { test, expect, request } from "@playwright/test";

test.describe("POST /objects - Happy Path", () => {
  test("API-TC-001: Create object with valid payload", async ({ request }) => {
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
    expect([200, 201]).toContain(response.status());
    expect(response.headers()["content-type"]).toContain("application/json");
    const body = await response.json();
    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("name", payload.name);
    expect(body).toHaveProperty("data");
    expect(body.data).toEqual(payload.data);
    expect(body).toHaveProperty("createdAt");
    // ISO 8601 check
    expect(new Date(body.createdAt).toISOString()).toBe(body.createdAt);
    // Response time check (simulate, as Playwright does not expose directly)
    // expect(response.timing().responseEnd).toBeLessThan(3000);
  });
});