import type { loginDataResponse, NewUserData, NewUserDataResponse, UpdateUserData } from "../../lib/interface";
import User from "../../models/users.model";
import bcrypt from "bcrypt";

export const createNewUser = async (userData: NewUserData): Promise<NewUserDataResponse> => {
  const { name, email, password, city, country } = userData;
  let user = await User.findOne({ email });
  if (user) {
    return { message: "User already exists", success: false, statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashedPassword,
    address: {
      city,
      country,
    },
  });
  await user.save();

  return {
    message: "User created successfully",
    success: true,
    statusCode: 201,
  };
};

export const loginUserSvc = async (email: string, password: string): Promise<loginDataResponse> => {
  const user = await User.findOne({ email });
  if (!user) {
    return { message: "Invalid email or password", success: false, statusCode: 401 };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { message: "Invalid email or password", success: false, statusCode: 401 };
  }

  user.lastSeen = new Date();
  await user.save();

  return {
    message: "Login successful",
    success: true,
    statusCode: 200,
    user: { ...user.toObject(), password: undefined } as typeof user & { password?: undefined },
  };
};

export const getUserSession = async (userId: string): Promise<loginDataResponse> => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    return { message: "User not found", success: false, statusCode: 404 };
  }
  return { message: "User logged in", success: true, statusCode: 200, user };
};

export const updateUserData = async (userId: string, updates: UpdateUserData): Promise<loginDataResponse> => {
  const { email, name, address } = updates;

  let updateObj = {};

  if (email) updateObj = { ...updateObj, email };
  if (name) updateObj = { ...updateObj, name };
  if (address) {
    if (address.city) updateObj = { ...updateObj, "address.city": address.city };
    if (address.country) updateObj = { ...updateObj, "address.country": address.country };
  }
  const user = await User.findByIdAndUpdate(userId, { $set: updateObj }, { new: true }).select("-password");
  if (!user) {
    return { message: "User not found", success: false, statusCode: 404 };
  }
  return { message: "User updated successfully", success: true, statusCode: 200, user };
};
