import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { config } from 'dotenv';

config();

const options: SeederOptions & DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
  ssl: {
    rejectUnauthorized: false,
  },
};

export const AppDataSource = new DataSource(options);
