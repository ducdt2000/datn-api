import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/services/user.service';
import { AuthService } from './auth.service';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { ConfigurationModule } from '../config/configuration.module';
import { AuthController } from './controllers/auth.controller';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    SharedModule,
    ConfigurationModule,
    PassportModule,
    CartModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwt.secret'),
          signOptions: {
            expiresIn: `${configService.get<string>('jwt.expirationTime')}s`,
          },
        };
      },
    }),
  ],
  providers: [UserService, AuthService, JwtAuthStrategy],
  controllers: [AuthController],
  exports: [UserService, AuthService],
})
export class AuthModule {}
