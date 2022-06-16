import * as Joi from '@hapi/joi';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

import configuration from './configuration';

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: './apps/bff-microservice/.env',
  load: [configuration],
  validationSchema: Joi.object({
    APP_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    APP_PORT: Joi.number().required(),
    USER_MICROSERVICE_URL: Joi.string().required(),
    CART_MICROSERVICE_URL: Joi.string().required(),
    PRODUCT_MICROSERVICE_URL: Joi.string().required(),
    ORDER_MICROSERVICE_URL: Joi.string().required(),
    MEDIA_MICROSERVICE_URL: Joi.string().required(),
    WAREHOUSE_MICROSERVICE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION_TIME: Joi.number().required(),
  }),
};
