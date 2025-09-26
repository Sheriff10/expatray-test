# API Backend

A RESTful API built with **Express** and **TypeScript** for managing user authentication and admin-level operations.  
The project implements JWT-based authentication, user session handling, and role-based access control.

---

## Features

- User registration and login with JSON Web Tokens (JWT)
- Authenticated user session retrieval
- User profile updates
- Admin-only operations for managing users
- Role-based access control with middlewares
- Organized route structure for scalability

---

## Project Structure

```
src/
│
├── index.ts                # Main router entry point
│
├── modules/
│   ├── user/
│   │   ├── user.route.ts   # User routes
│   │   └── user.controller.ts
│   │
│   └── admin/
│       ├── admin.route.ts  # Admin routes
│       └── admin.controller.ts
│
└── middlewares/
    ├── auth.middleware.ts       # Authentication middleware
    └── admin-only.middleware.ts # Middleware for admin-only routes
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Sheriff10/expatray-test.git
cd expatray-test
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

### 4. Run the application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The API will be available at:

```
http://localhost:3000
```

---

## API Endpoints

### Public Routes

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/user/register` | Register a new user |
| POST   | `/user/login`    | Authenticate a user |

---

### Authenticated User Routes

| Method | Endpoint        | Description                       |
| ------ | --------------- | --------------------------------- |
| GET    | `/user/session` | Retrieve current user session     |
| PUT    | `/user/update`  | Update logged-in user information |

> Requires `Authorization: Bearer <token>` header.

---

### Admin Routes (Protected)

| Method | Endpoint               | Description                 |
| ------ | ---------------------- | --------------------------- |
| GET    | `/admin/users`         | Retrieve all users          |
| GET    | `/admin/users/:userId` | Retrieve a single user      |
| PUT    | `/admin/user/:userId`  | Update a user’s information |
| DELETE | `/admin/user/:userId`  | Delete a user               |

> Requires admin role and `Authorization: Bearer <token>` header.

---

## Authentication

All protected endpoints use JWT-based authentication.  
Include the token in the request headers:

```
Authorization: Bearer <your-token>
```

---

## Documentation

API documentation can be published via Postman.  
Once published, include the link below:

[API Documentation](https://ballistic-7944.postman.co/workspace/Team-Workspace~6504b1c0-ead1-4ae6-8e52-2d57f2c46d2d/collection/11580726-9313a624-2adf-480c-981f-ad2441bcb79c?action=share&creator=11580726&active-environment=11580726-00bf1836-20fc-43fa-ab9d-a2f09798d042)

---

## Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Run the application in development mode |
| `npm run build` | Compile TypeScript into JavaScript      |
| `npm start`     | Start the compiled production server    |

---

## License

This project is licensed under the **MIT License**.
