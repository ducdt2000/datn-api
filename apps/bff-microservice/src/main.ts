import { RequestIdMiddleware } from './../../../shared/middlewares/request-id.middleware';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { exceptionFactory } from './../../../shared/filters/exception-factory.filter';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/api');

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, exceptionFactory }),
  );
  app.use(RequestIdMiddleware);
  app.enableCors();

  //Swagger
  const options = new DocumentBuilder()
    .setTitle('Backend for Frontend Microservice API')
    .setDescription('Backend for Frontend Microservice API for Pamela Project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  await app.listen(port);
}
bootstrap();
