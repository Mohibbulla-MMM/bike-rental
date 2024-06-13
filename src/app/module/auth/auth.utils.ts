import jwt from "jsonwebtoken";
import { TtokenPayload } from "./auth.interface";

export const createToken = (
  payload: TtokenPayload,
  secretKey: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};
