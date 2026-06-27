# Backend API Documentation

## POST /users/register

Registers a new user and returns an authentication token.

### Description

This endpoint accepts user registration data, validates the input, hashes the password, creates a new user record, and generates a JWT authentication token.

### Request URL

`POST /users/register`

### Request Headers

- `Content-Type: application/json`

### Request Body

The request body must be a JSON object with the following properties:

```json
{
  "fullName": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

### Required Fields

- `fullName.firstname` (string): required, minimum 3 characters
- `email` (string): required, must be a valid email address
- `password` (string): required, minimum 6 characters

### Optional Fields

- `fullName.lastname` (string): optional, minimum 3 characters if provided

### Responses

#### 201 Created

Returned when the user registration succeeds.

Example response:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullName": {
      "firstName": "<firstname>",
      "lastName": "<lastname>"
    },
    "email": "<email>"
  }
}
```

> Note: The response may omit the password field.

#### 400 Bad Request

Returned when request validation fails.

Example validation errors:

- `Invalid email address`
- `First name must be at least 3 characters long`
- `Password must be at least 6 characters long`
- `All fields are required`

#### 500 Internal Server Error

Returned when an unexpected error occurs on the server.
