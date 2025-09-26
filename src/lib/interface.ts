import type { IUser } from "../models/users.model";

export interface NewUserData {
  name: string;
  email: string;
  password: string;
  city: string;
  country: string;
}

export interface NewUserDataResponse {
  message: string;
  success: boolean;
  statusCode: number;
}

export interface loginDataResponse {
  message: string;
  success: boolean;
  statusCode: number;
  user?: IUser;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role?: string;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  address?: {
    city?: string;
    country?: string;
  };
}
