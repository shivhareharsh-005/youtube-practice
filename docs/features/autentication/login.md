# Login Feature

## Purpose

The purpose of login is to verify the user's identity using valid credentials. After successful verification, the system authenticates the user and grants secure access to protected resources.

---

## Request Body

### Required Fields

- Username or Email
- Password

---

## Validation Rules

### Username / Email
- Required
- Must exist in the database.

### Password
- Required
- Must not be empty.
- The entered password must match the securely stored password.

---

## Login Flow

1. User enters username (or email) and password.
2. Backend receives the login request.
3. Validate the input fields.
4. Find the user in the database.
5. Compare the entered password with the stored hashed password.
6. If the credentials are valid:
   - Generate an Access Token.
   - Generate a Refresh Token.
7. Store the tokens securely using HttpOnly Cookies.
8. Return a success response.

---

## Access Token

- Used to access protected APIs.
- Has a short expiration time.
- Sent with authenticated requests.

---

## Refresh Token

- Has a longer expiration time.
- Used to generate a new Access Token when the current Access Token expires.
- Allows the user to stay logged in without entering credentials repeatedly.

---

## Success Response

- Login successful.
- Authentication tokens are issued.
- User can access protected resources.

---

## Error Responses

### 400 Bad Request
- Missing username/email
- Missing password

### 401 Unauthorized
- Invalid username/email
- Incorrect password

### 500 Internal Server Error
- Unexpected server error

---

## Edge Cases

- User does not exist.
- Incorrect password.
- Empty request body.
- Expired Access Token.
- Invalid Refresh Token.