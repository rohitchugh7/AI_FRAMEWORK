import { test, expect, request } from "@playwright/test";

test.describe("POST /objects - Header & Performance", () => {
  test("API-TC-006: Response Content-Type is application/json", async ({
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
    const response = await request.post("https://api.restful-api.dev/objects", {
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    expect(response.headers()["content-type"]).toContain("application/json");
  });

  // Note: Playwright does not expose response time directly, so this is a placeholder
  test("API-TC-007: Response time under 3000ms (simulated)", async ({
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
    const start = Date.now();
    const response = await request.post("https://api.restful-api.dev/objects", {
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(3000);
  });
});