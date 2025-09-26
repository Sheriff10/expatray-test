import { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser } from "./admin.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import adminOnly from "../../middlewares/admin-only.middleware";

const adminRouter = Router();

adminRouter.use(authMiddleware, adminOnly);
adminRouter.get("/users/", getUsers);
adminRouter.get("/users/:userId", getUser);
adminRouter.put("/user/:userId", updateUser);
adminRouter.delete("/user/:userId", deleteUser);

export default adminRouter;
