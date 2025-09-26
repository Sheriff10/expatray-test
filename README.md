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
git clone <repository-url>
cd <project-folder>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment variables
Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
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
http://localhost:5000
```

---

## API Endpoints

### Public Routes

| Method | Endpoint           | Description               |
|--------|-------------------|---------------------------|
| POST   | `/user/register`   | Register a new user       |
| POST   | `/user/login`      | Authenticate a user       |

---

### Authenticated User Routes

| Method | Endpoint           | Description                        |
|--------|-------------------|------------------------------------|
| GET    | `/user/session`    | Retrieve current user session      |
| PUT    | `/user/update`     | Update logged-in user information  |

> Requires `Authorization: Bearer <token>` header.

---

### Admin Routes (Protected)

| Method | Endpoint                | Description                  |
|--------|------------------------|------------------------------|
| GET    | `/admin/users`          | Retrieve all users           |
| GET    | `/admin/users/:userId`  | Retrieve a single user       |
| PUT    | `/admin/user/:userId`   | Update a user’s information  |
| DELETE | `/admin/user/:userId`   | Delete a user                |

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

```
[API Documentation](<postman-documentation-link>)
```

---

## Scripts
| Command       | Description                 |
|---------------|-----------------------------|
| `npm run dev` | Run the application in development mode |
| `npm run build` | Compile TypeScript into JavaScript   |
| `npm start`   | Start the compiled production server  |

---

## License
This project is licensed under the **MIT License**.
