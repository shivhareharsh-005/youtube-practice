# Logout Feature

## Purpose

The logout feature ends the current user session by clearing the authentication credentials and preventing further access to protected routes until the user logs in again.

---

## Endpoint

Example:

- POST /api/auth/logout

---

## Preconditions

- The user must be authenticated.
- A valid session or token must exist.

---

## Logout Flow

1. The user clicks the logout button.
2. The frontend sends a logout request to the backend.
3. The backend verifies the authenticated session.
4. The backend clears the authentication cookies or token storage.
5. The backend optionally invalidates the refresh token.
6. The backend returns a success message.

---

## Success Response

```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## Error Responses

### 401 Unauthorized
- User is not authenticated
- Invalid or expired token

### 500 Internal Server Error
- Unexpected server issue

---

## Edge Cases

- User tries to log out without being logged in
- Authentication token is already expired
- Authentication cookies are missing
- Refresh token is already invalidated