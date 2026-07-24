# Refresh Token Feature

## Purpose

The refresh token mechanism allows a user to stay signed in without repeatedly entering credentials. When the short-lived Access Token expires, the Refresh Token is used to issue a new Access Token.

---

## Endpoint

Example:

- POST /api/auth/refresh-token

---

## Why It Is Needed

Access Tokens are intentionally short-lived for security. A Refresh Token provides a safer and more convenient way to maintain the session without forcing the user to log in again after every expiration.

---

## Flow

1. The user logs in successfully.
2. The backend issues an Access Token and a Refresh Token.
3. The user uses the Access Token to access protected routes.
4. When the Access Token expires, the frontend sends the Refresh Token.
5. The backend validates the Refresh Token.
6. If the token is valid, a new Access Token is issued.
7. The user continues using the app without logging in again.

---

## Validation Rules

- Refresh token must be present
- Refresh token must be valid
- Refresh token must not be expired
- Refresh token must belong to an active user session

---

## Success Response

```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "accessToken": "new_access_token"
}
```

---

## Error Responses

### 401 Unauthorized
- Missing refresh token
- Invalid refresh token
- Expired refresh token

### 403 Forbidden
- User session has been invalidated

### 500 Internal Server Error
- Unexpected server issue

---

## Edge Cases

- Missing Refresh Token
- Invalid Refresh Token
- Expired Refresh Token
- User account deleted
- User logged out and token revoked