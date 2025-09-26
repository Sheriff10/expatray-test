import { Router } from "express";
import { loginUser, registerUser, updateUser, userSession } from "./user.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const userRouter = Router();

// Public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected routes
userRouter.use(authMiddleware);
userRouter.get("/session", userSession);
userRouter.put("/update", updateUser);

export default userRouter;
