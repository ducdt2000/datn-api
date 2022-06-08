import { AppLogger } from './../../../../../shared/logger/logger.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserOutput } from '../dtos/user-output.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly logger: AppLogger,
    private readonly authService: AuthService,
  ) {
    super({
      usernameField: 'account',
    });
    this.logger.setContext(LocalStrategy.name);
  }

  async validate(account: string, password: string): Promise<UserOutput> {
    return this.authService.getAuthenticatedUser(account, password);
  }
}
