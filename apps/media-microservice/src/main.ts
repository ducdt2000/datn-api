import { RequestIdMiddleware } from './../../../shared/middlewares/request-id.middleware';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { exceptionFactory } from 'shared/filters/exception-factory.filter';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { config as configAwsS3 } from 'aws-sdk';

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
    .setTitle('Media Microservice API')
    .setDescription('Media Microservice API for Pamela Project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  //aws s3
  configAwsS3.update({
    accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
    region: configService.get<string>('AWS_REGION'),
    secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
  });

  await app.listen(port);
}
bootstrap();
