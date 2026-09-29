import type { Payload } from "./payload.types";

declare global {
  namespace Express {
    interface Request {
      userInfo?: Payload;
    }
  }
}
