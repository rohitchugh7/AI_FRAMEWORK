# 🧪 User Story: API Testing for Create Object (POST /objects)

## 📌 Story ID

API-POST-001

## 📌 Title

Validate POST API for creating an object

---

## 👤 As a

QA Engineer / Automation Tester

## 🎯 I want to

Validate the POST `/objects` API endpoint for creating a new object

## 💡 So that

I can ensure object creation works correctly, returns the right status codes, and meets response contract/schema expectations

---

## 🌐 API Details

| Field          | Value                         |
| -------------- | ----------------------------- |
| Base URL       | `https://api.restful-api.dev` |
| Endpoint       | `/objects`                    |
| Method         | `POST`                        |
| Authentication | None (public API)             |
| Content-Type   | `application/json`            |
| Accept         | `application/json`            |

---

## 📥 Request Headers

```
Content-Type: application/json
Accept: application/json
```

## 📥 Request Payload

```json
{
  "name": "Apple MacBook Pro 16",
  "data": {
    "year": 2019,
    "price": 1849.99,
    "CPU model": "Intel Core i9",
    "Hard disk size": "1 TB"
  }
}
```

---

## 📤 Expected Response

### Status Code: `201 Created`

### Response Headers

```
Content-Type: application/json
```

### Response Body

```json
{
  "id": "<server-generated-string>",
  "name": "Apple MacBook Pro 16",
  "data": {
    "year": 2019,
    "price": 1849.99,
    "CPU model": "Intel Core i9",
    "Hard disk size": "1 TB"
  },
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

---

## 📕 Response Schema

| Field                 | Type    | Required | Constraints                                         |
| --------------------- | ------- | -------- | --------------------------------------------------- |
| `id`                  | string  | Yes      | Non-empty, server-generated unique identifier       |
| `name`                | string  | Yes      | Must match the `name` sent in the request           |
| `data`                | object  | Yes      | Must match the `data` object sent in the request    |
| `data.year`           | integer | Yes      | Positive integer                                    |
| `data.price`          | number  | Yes      | Positive decimal                                    |
| `data.CPU model`      | string  | Yes      | Non-empty string                                    |
| `data.Hard disk size` | string  | Yes      | Non-empty string                                    |
| `createdAt`           | string  | Yes      | ISO 8601 datetime (e.g. `2025-01-01T10:00:00.000Z`) |

---

## ✅ Acceptance Criteria

### AC1: Status Code

- API must return `201 Created` for a valid POST request

### AC2: Response Schema Validation

- Response body must contain all fields: `id`, `name`, `data`, `createdAt`
- Each field must match the types and constraints defined in the Response Schema table above
- `createdAt` must be a valid ISO 8601 datetime string

### AC3: Mandatory Field — `name`

- `name` is a required field
- Requests missing `name`, or where `name` is empty or null, must return `400 Bad Request`

### AC4: Response Content-Type Header

- Response must include `Content-Type: application/json`

### AC5: Response Field Presence

- All fields `id`, `name`, `data`, `createdAt` must be present in every successful response
- `id` must be unique — two identical POST requests must return different `id` values

### AC6: Data Echo

- `name` in the response must exactly match the `name` sent in the request
- `data` in the response must exactly match the `data` object sent in the request

### AC7: Response Time

- API must respond within `3000ms` under normal single-user load

### AC8: Non-Idempotency

- Sending the same payload twice must create two separate objects with different `id` values

---

## 🚀 Priority

**High**

## 🏷️ Tags

`API` `POST` `Automation` `Schema Validation` `Contract Testing` `REST` `CRUD`