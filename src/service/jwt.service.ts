import jwt from "jsonwebtoken";
import type { JwtPayload } from "../lib/interface";
import secret from "../config/secret";

const { JWT_SECRET, JWT_EXPIRES_IN } = secret;

const JwtService = {
  generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
  },

  verifyToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  },
};

export default JwtService;
