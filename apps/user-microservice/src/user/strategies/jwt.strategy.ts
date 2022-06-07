import { UserService } from './../services/user.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly logger: AppLogger,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({ jwtFromRequest: ExtractJwt });
  }
}
