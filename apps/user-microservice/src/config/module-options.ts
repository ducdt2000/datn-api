import * as Joi from '@hapi/joi';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import configuration from './configuration';

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: './apps/user-microservice/.env',
  load: [configuration],
  validationSchema: Joi.object({
    APP_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    APP_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().optional(),
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),
    DB_CHARSET: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION_TIME: Joi.string().required(),
    CART_MICROSERVICE_URL: Joi.string().required(),
  }),
};
