import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { SharedModule } from 'shared/shared.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule,
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
        entities: [],
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
