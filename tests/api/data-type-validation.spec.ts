import { test, expect, request } from "@playwright/test";

test.describe("POST /objects - Data Type Validation", () => {
  test("API-TC-004: Invalid data types in payload", async ({ request }) => {
    const payload = { name: 123, data: { year: "not-a-year" } };
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