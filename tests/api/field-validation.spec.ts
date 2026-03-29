import { test, expect, request } from "@playwright/test";

test.describe("POST /objects - Field Validation23234", () => {
  test("API-TC-002: Missing name field", async ({ request }) => {
    const payload = { data: { year: 2019 } };
    const response = await request.post("https://api.restful-api.dev/objects", {
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    expect([200, 400]).toContain(response.status());
  });

  test("API-TC-004: Empty name field", async ({ request }) => {
    const payload = { name: "", data: { year: 2019 } };
    const response = await request.post("https://api.restful-api.dev/objects", {
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    expect([200, 400]).toContain(response.status());
  });
});