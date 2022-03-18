module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'root',
  database: 'hiring_manager',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['dist/migration/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
