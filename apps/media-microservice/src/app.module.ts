import { ConfigurationModule } from './../../product-microservice/src/config/configuration.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SharedModule } from './../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from './file/file.module';
import { PublicFile } from './file/entities/public-file.entity';
@Module({
  imports: [
    SharedModule,
    ConfigurationModule,
    FileModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number | undefined>('database.port'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.pass'),
        extra: {
          charset: configService.get<string>('database.charset'),
        },
        entities: [PublicFile],
        timezone: 'Z',
        synchronize: false,
        debug: configService.get<string>('env') === 'development',
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
