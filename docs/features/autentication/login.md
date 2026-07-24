# Login Feature

## Purpose

The login feature allows a registered user to authenticate into the system using their email/username and password. On success, the system issues authentication tokens and grants access to protected resources.

---

## Endpoint

Example:

- POST /api/auth/login

---

## Request Body

### Required Fields

- usernameOrEmail
- password

### Example

```json
{
  "usernameOrEmail": "john@example.com",
  "password": "SecurePass123!"
}
```

---

## Validation Rules

### Username / Email
- Required
- Must be provided in the request body
- Must match an existing user record

### Password
- Required
- Must not be empty
- Must match the stored hashed password

---

## Login Flow

1. The user submits login credentials.
2. The backend validates the request body.
3. The system checks whether the user exists.
4. The entered password is compared with the stored hashed password.
5. If valid, the backend generates:
   - an Access Token
   - a Refresh Token
6. The tokens are stored securely, preferably in HttpOnly cookies.
7. The backend sends a success response.

---

## Token Behavior

### Access Token
- Used to access protected APIs
- Short-lived for security
- Sent with authenticated requests

### Refresh Token
- Longer-lived than the Access Token
- Used to issue a new Access Token when the current one expires
- Helps keep the user logged in without repeating login

---

## Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "username": "john"
  }
}
```

---

## Error Responses

### 400 Bad Request
- Missing username/email
- Missing password
- Empty request body

### 401 Unauthorized
- Invalid username/email
- Incorrect password

### 500 Internal Server Error
- Unexpected server issue

---

## Edge Cases

- User does not exist
- Incorrect password
- Expired Access Token
- Invalid Refresh Token
- Missing authentication cookies