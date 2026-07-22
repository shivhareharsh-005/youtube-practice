# Register Feature

## Purpose

The purpose of registration is to allow a new user to create an account on the platform. During registration, the system collects the required user information, validates the input, securely stores the data in the database, and prepares the account for future authentication.

---

## Request Body

### Required Fields

- Full Name
- Username
- Email
- Password

### Optional Fields

- Profile Image (Avatar)
- Cover Image
- Date of Birth
- Gender

---

## Validation Rules

### Full Name
- Required
- Cannot be empty
- Should contain valid characters only

### Username
- Required
- Must be unique
- Cannot contain spaces
- Stored in lowercase

### Email
- Required
- Must be a valid email address
- Must be unique
- Stored in lowercase

### Password
- Required
- Minimum 8 characters
- Must contain at least:
  - One uppercase letter
  - One lowercase letter
  - One digit
  - One special character
- Password must never be stored in plain text. It should always be stored as a hashed value.

### Profile Image
- Optional
- If not provided, the system assigns a default avatar.
- Users can update it later.

### Cover Image
- Optional
- Users can upload or update it later.

### Date of Birth
- Optional
- Used for age-related features in the future.

### Gender
- Optional
- Stored only if the user chooses to provide it.

---

## Registration Flow

1. User submits the registration form.
2. Backend receives the request.
3. Validate all required fields.
4. Check whether the username already exists.
5. Check whether the email already exists.
6. Hash the password securely.
7. Store the user information in MongoDB.
8. Assign a default profile image if the user did not upload one.
9. Return a success response.

---

## Success Response

- User account created successfully.
- User information is stored in the database.
- User can now log in using their credentials.

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
- Unexpected server error

---

## Edge Cases

- Username already exists.
- Email already exists.
- User submits empty fields.
- Password does not meet security requirements.
- Email contains uppercase letters (convert to lowercase before storing).
- User does not upload a profile image (assign a default avatar).
- User refreshes the page while submitting the form.