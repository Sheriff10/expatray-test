import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  address: {
    country: string;
    city: string;
  };
  joinedOn: Date;
  lastSeen: Date;
  status: "active" | "inactive" | "suspended" | "deleted";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "customer" },
    address: {
      country: { type: String, required: true },
      city: { type: String, required: true },
    },
    joinedOn: { type: Date, required: true, default: Date.now },
    lastSeen: { type: Date, required: true, default: Date.now },
    status: { type: String, required: true, default: "active" },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
