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

## POST /users/login

Authenticates an existing user and returns a JWT authentication token.

### Description

This endpoint accepts user login credentials, validates the input, verifies the user exists, compares the provided password against the stored hash, and generates a JWT token on success.

### Request URL

`POST /users/login`

### Request Headers

- `Content-Type: application/json`

### Request Body

The request body must be a JSON object with the following properties:

```json
{
  "email": "string",
  "password": "string"
}
```

### Required Fields

- `email` (string): required, must be a valid email address
- `password` (string): required, minimum 6 characters

### Responses

#### 200 OK

Returned when login is successful.

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

#### 400 Bad Request

Returned when request validation fails.

Example validation errors:

- `Invalid email address`
- `Invalid password`
- `All fields are required`

#### 401 Unauthorized

Returned when authentication fails due to incorrect email or password.

#### 500 Internal Server Error

Returned when an unexpected error occurs on the server.

## GET /users/profile

Returns the profile of the currently authenticated user.

### Description

This endpoint reads the authenticated user's identity from the JWT token and returns the user profile information.

### Request URL

`GET /users/profile`

### Request Headers

- `Authorization: Bearer <jwt-token>`

> The server also supports the token being sent via the `token` cookie.

### Responses

#### 200 OK

Returned when the user is authenticated successfully.

Example response:

```json
{
  "_id": "<user-id>",
  "fullName": {
    "firstName": "<firstname>",
    "lastName": "<lastname>"
  },
  "email": "<email>"
}
```

#### 401 Unauthorized

Returned when no token is provided, the token is invalid, or the token has been blacklisted.

## GET /users/logout

Logs out the currently authenticated user.

### Description

This endpoint clears the authentication cookie and marks the current token as blacklisted so it can no longer be used.

### Request URL

`GET /users/logout`

### Request Headers

- `Authorization: Bearer <jwt-token>`

> The server also supports the token being sent via the `token` cookie.

### Responses

#### 200 OK

Returned when logout succeeds.

Example response:

```json
{
  "message": "logged out"
}
```

#### 401 Unauthorized

Returned when no token is provided, the token is invalid, or the token has been blacklisted.
