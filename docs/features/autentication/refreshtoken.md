# Refresh Token Feature

## Purpose

The purpose of the Refresh Token is to allow users to stay logged in without entering their credentials repeatedly. It is used to generate a new Access Token after the current Access Token expires.

---

## Why is it Required?

Access Tokens have a short expiration time for security reasons. If users had to log in every time the Access Token expired, it would result in a poor user experience.

A Refresh Token solves this problem by allowing the backend to issue a new Access Token after verifying the Refresh Token.

---

## Flow

1. User logs in successfully.
2. Backend generates:
   - Access Token
   - Refresh Token
3. User accesses protected routes using the Access Token.
4. Access Token expires.
5. Frontend sends the Refresh Token to the backend.
6. Backend verifies the Refresh Token.
7. If valid:
   - Generate a new Access Token.
   - Send it back to the client.
8. User continues using the application without logging in again.

---

## If Refresh Token is Invalid or Expired

- The backend rejects the request.
- The user must log in again.
- New authentication tokens are generated only after successful login.

---

## Edge Cases

- Missing Refresh Token.
- Invalid Refresh Token.
- Expired Refresh Token.
- User account no longer exists.
- User has logged out and the Refresh Token has been invalidated.