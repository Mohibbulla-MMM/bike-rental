import dotenv from "dotenv";
import { join } from "node:path";

const filePath = join(process.cwd(), ".env");

dotenv.config({ path: filePath });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
};
