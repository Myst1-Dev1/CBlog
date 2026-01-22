import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './src/user/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASS),
  database: process.env.DB_NAME,
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
