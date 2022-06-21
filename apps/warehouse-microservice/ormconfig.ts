import { config } from 'dotenv';

config({ path: `apps/warehouse-microservice/.env` });

export default [
  {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : null,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    extra: {
      charset: process.env.DB_CHARSET,
    },
    entities: [__dirname + '/src/**/**.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    migrationsRun: false,
    cli: {
      entitiesDir: __dirname + '/src/',
      migrationsDir: __dirname + '/migrations',
    },
    // Timezone configured on the MySQL server.
    // This is used to typecast server date/time values to JavaScript Date object and vice versa.
    timezone: 'Z',
    synchronize: false,
    debug: process.env.NODE_ENV === 'development' ? true : false,
  },
];
