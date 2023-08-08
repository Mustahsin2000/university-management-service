import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
//pass:5u3gj4MwABZ2ju4v
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_user_pass: process.env.DEFAULT_USER_PASS,
};
