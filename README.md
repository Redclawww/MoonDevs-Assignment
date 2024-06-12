# TMD: FullStack Intern Assignment

## Overview

This assignment involves setting up a simple username/password authentication system using Redux for state management and Next.js for the front-end and back-end. You will create API endpoints with bearer token authentication and implement a custom `useAuthSession` hook to manage the user's session on the client side.

## Created Funcationality

1. **Implement the `useAuthSession` Hook**:
   - In `hooks/useAuthSession.ts`, create a custom hook that manages the user's authentication session.
   - The hook should handle checking if a user is authenticated and fetching user data.

2. **Create and Complete the API Endpoints**:

   - Created the required User and Login Endpoint

3. **Bearer Token Authentication**:
   - Implemented bearer token authentication in your API endpoints.
   - Ensured that API requests are secured and only accessible to authenticated users.

4. **Added Proper Form Validation using React-hook-form**

5. **Added toast UI component from shadcn for Erros and Successdul Logins**

## Example Usage of useAuthSession Hook

```bash
const { user } = useAuthSession();

if (user) {
  console.log('User:', user.username);
}
```

## How to use

```
   npm install
   npm run dev
```


# MoonDevs-Assignment
