import type { Request, Response } from "express";
import { loginUserSchma, registerUserSchma, updateUserSchema } from "./user.validation";
import { createNewUser, getUserSession, loginUserSvc, updateUserData } from "./user.service";
import JwtService from "../../service/jwt.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = registerUserSchma.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    console.log(error);
    const { email, password, name, city, country } = value;

    const { message, success, statusCode } = await createNewUser({
      name,
      email,
      password,
      city,
      country,
    });

    if (!success) {
      return res.status(statusCode).json({ message });
    }
    return res.status(statusCode).json({ message });
  } catch (error) {
    console.log("Error during user registration:", error);
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = loginUserSchma.validate(req.body);
    const { email, password } = value;
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { message, success, statusCode, user } = await loginUserSvc(email, password);
    if (!success) {
      return res.status(statusCode).json({ message });
    }

    if (!user) {
      return res.status(500).json({ message: "User not found after login." });
    }

    const accessToken = JwtService.generateToken({
      email: user.email,
      role: user.role ?? "",
      userId: user._id.toString(),
    });

    return res.status(statusCode).json({ message, user, accessToken });
  } catch (error) {
    console.log("Error during user login:", error);
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const userSession = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;
    const { user, success, message, statusCode } = await getUserSession(userId);
    if (!success) {
      return res.status(statusCode).json({ message });
    }
    if (!user) {
      return res.status(500).json({ message: "User not found." });
    }

    return res.status(statusCode).json({ message, user });
  } catch (error) {
    console.log("Error getting user session", error);
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = updateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const userId = req.user.userId;
    const result = await updateUserData(userId, value);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Error updating user data", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
