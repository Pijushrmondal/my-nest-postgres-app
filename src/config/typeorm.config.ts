import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import dotenv from "dotenv";
dotenv.config();
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "blive",
  synchronize: true,
  entities: ["dist/database/entity/public/*.entity.js"],
  logging: true,
};
