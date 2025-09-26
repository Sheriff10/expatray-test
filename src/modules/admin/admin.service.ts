import User from "../../models/users.model";

export const softDeleteUser = async (userId: string) => {
  const user = await User.findByIdAndUpdate(userId, { status: "deleted" }, { new: true }).select("-password");
  return user;
};

export const getAllUsers = async (limit: number = 10, offset: number = 0) => {
  const users = await User.find({ status: { $ne: "deleted" } })
    .skip(offset)
    .limit(limit)
    .select("-password")
    .sort({ createdAt: -1 });

  const total = await User.countDocuments();

  return {
    success: true,
    message: "Users fetched successfully",
    statusCode: 200,
    data: users,
    pagination: {
      total,
      limit,
      offset,
      hasNext: offset + limit < total,
    },
  };
};

export const getSingleUser = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    return { success: false, message: "User not found", statusCode: 404 };
  }
  return { success: true, message: "User fetched successfully", statusCode: 200, user };
};
