# API Test Plan for POST /objects (API-POST-001)

## Overview

This test plan covers the validation of the POST `/objects` endpoint at `https://api.restful-api.dev`. It addresses all acceptance criteria, including contract validation, field validation, non-idempotency, and response time.

## Test Scenarios

### Happy Path

- **API-TC-001**: Create object with valid payload
  - Method: POST /objects
  - Headers: Content-Type: application/json, Accept: application/json
  - Payload: {"name": "Apple MacBook Pro 16", "data": {"year": 2019, "price": 1849.99, "CPU model": "Intel Core i9", "Hard disk size": "1 TB"}}
  - Expected: 201 Created, response schema matches contract, all fields present, response time < 3000ms

### Mandatory Field Validation

- **API-TC-002**: Missing `name` field
  - Method: POST /objects
  - Payload: {"data": {"year": 2019}}
  - Expected: 400 Bad Request
- **API-TC-003**: Empty `name` field
  - Method: POST /objects
  - Payload: {"name": "", "data": {"year": 2019}}
  - Expected: 400 Bad Request

### Data Type & Format Validation

- **API-TC-004**: Invalid data types in payload
  - Method: POST /objects
  - Payload: {"name": 123, "data": {"year": "not-a-year"}}
  - Expected: 400 Bad Request

### Non-Idempotency

- **API-TC-005**: Identical payloads yield different IDs
  - Method: POST /objects (twice)
  - Payload: {"name": "Apple MacBook Pro 16", "data": {"year": 2019, "price": 1849.99, "CPU model": "Intel Core i9", "Hard disk size": "1 TB"}}
  - Expected: Both responses 201 Created, but `id` values are different

### Response Header Validation

- **API-TC-006**: Response Content-Type is application/json
  - Method: POST /objects
  - Expected: Response header Content-Type: application/json

### Response Time

- **API-TC-007**: Response time under 3000ms
  - Method: POST /objects
  - Expected: Response time < 3000ms

### Schema Validation

- **API-TC-008**: Response matches schema
  - Method: POST /objects
  - Expected: All fields present, correct types, `createdAt` is ISO 8601

## Traceability Matrix

| Test Case ID | Endpoint | Category             |
| ------------ | -------- | -------------------- |
| API-TC-001   | /objects | Happy Path           |
| API-TC-002   | /objects | Field Validation     |
| API-TC-003   | /objects | Field Validation     |
| API-TC-004   | /objects | Data Type Validation |
| API-TC-005   | /objects | Non-Idempotency      |
| API-TC-006   | /objects | Header Validation    |
| API-TC-007   | /objects | Performance          |
| API-TC-008   | /objects | Schema Validation    |

---

Each test case includes method, endpoint, headers, payload, expected status, response schema, and timing. Priorities: All P1 (Critical).