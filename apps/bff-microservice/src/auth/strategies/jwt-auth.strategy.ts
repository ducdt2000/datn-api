import { Injectable } from '@nestjs/common';
import { createRequestContext } from 'shared/request-context/util';
import { AuthService } from './../auth.service';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserTokenOutput } from '../../user/dtos/user-token-output.dto';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(req: any, payload: any): Promise<UserTokenOutput> {
    const detail = await this.userService.getUserAccessInfo(
      createRequestContext(req),
      payload.id,
    );
    payload.user = detail;
    return payload;
  }
}
