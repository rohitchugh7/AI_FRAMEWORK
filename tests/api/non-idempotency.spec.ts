import { test, expect, request } from "@playwright/test";

test.describe("POST /objects - Non-Idempotency", () => {
  test("API-TC-005: Identical payloads yield different IDs", async ({
    request,
  }) => {
    const payload = {
      name: "Apple MacBook Pro 16",
      data: {
        year: 2019,
        price: 1849.99,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB",
      },
    };
    const response1 = await request.post(
      "https://api.restful-api.dev/objects",
      {
        data: payload,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    const response2 = await request.post(
      "https://api.restful-api.dev/objects",
      {
        data: payload,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    const body1 = await response1.json();
    const body2 = await response2.json();
    expect([200, 201]).toContain(response1.status());
    expect([200, 201]).toContain(response2.status());
    expect(body1.id).not.toBe(body2.id);
  });
});