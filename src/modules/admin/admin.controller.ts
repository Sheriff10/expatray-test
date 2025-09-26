import { Request, Response } from "express";
import { updateUserAdminSchema } from "./admin.validation";
import { updateUserData } from "../user/user.service";
import { getAllUsers, getSingleUser, softDeleteUser } from "./admin.service";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { error, value } = updateUserAdminSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const result = await updateUserData(userId, value);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Error updating user data", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "UserId Required" });

    const result = await softDeleteUser(userId);
    return res.status(201).json(result);
  } catch (error) {
    console.error("Error updating user data", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const result = await getAllUsers(limit, offset);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.log("Error getting users", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await getSingleUser(userId);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.log("Error getting single user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
