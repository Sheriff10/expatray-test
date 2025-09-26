import { Router } from "express";
import adminRouter from "../modules/admin/admin.route";
import userRouter from "../modules/user/user.route";

const appRouter = Router();

appRouter.use("/admin", adminRouter);
appRouter.use("/user", userRouter);
export default appRouter;
