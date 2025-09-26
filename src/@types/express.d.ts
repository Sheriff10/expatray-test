import type { JwtPayload } from "../lib/interface.ts";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
