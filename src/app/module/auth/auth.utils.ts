import jwt from "jsonwebtoken";
import { TtokenPayload } from "./auth.interface";

export const tokenCreate = (
  payload: TtokenPayload,
  secretKey: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};
