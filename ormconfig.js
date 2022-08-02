require('dotenv/config');

const { DB_PORT, DB_HOST } = process.env;
module.exports = {
  type: 'postgres',
  host: `${DB_HOST}`,
  port: `${DB_PORT}`,
  url: process.env.DATABASE_URL,
  username: 'postgres',
  password: 'root',
  database: 'hiring_manager',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['dist/migration/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/**/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
    seeds: ['src/database/seeds/**/*seed{.ts,.js}'],
    factories: ['src/database/factories/**/*factory{.ts,.js}'],
  },
};
