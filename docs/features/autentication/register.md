# Register Feature

## Purpose

The registration feature allows a new user to create an account. During registration, the system validates the provided information, protects the password, stores the user details, and prepares the account for future login.

---

## Endpoint

Example:

- POST /api/auth/register

---

## Request Body

### Required Fields

- fullName
- username
- email
- password

### Optional Fields

- profileImage
- coverImage
- dateOfBirth
- gender

### Example

```json
{
  "fullName": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

---

## Validation Rules

### Full Name
- Required
- Must not be empty
- Should contain valid characters only

### Username
- Required
- Must be unique
- Must not contain spaces
- Preferably stored in lowercase

### Email
- Required
- Must be a valid email format
- Must be unique
- Preferably stored in lowercase

### Password
- Required
- Minimum 8 characters
- Must include at least one uppercase letter, one lowercase letter, one digit, and one special character
- Must be hashed before storage

### Optional Profile Fields
- If not provided, the system can assign a default avatar or leave the field empty
- Users can update these later

---

## Registration Flow

1. The user fills the registration form.
2. The backend validates the request data.
3. The system checks whether the username and email already exist.
4. The password is securely hashed.
5. The user record is saved to the database.
6. The backend returns a success response.

---

## Success Response

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## Error Responses

### 400 Bad Request
- Missing required fields
- Invalid email format
- Weak password
- Invalid username

### 409 Conflict
- Username already exists
- Email already exists

### 500 Internal Server Error
- Unexpected server issue

---

## Edge Cases

- Username already exists
- Email already exists
- Empty form submission
- Weak password
- Email stored with uppercase letters
- User does not upload profile image