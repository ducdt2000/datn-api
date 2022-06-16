import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { RequestContext } from './../../../../shared/request-context/request-context.dto';
import { HttpRequestService } from './../../../../shared/http-request/http-request.service';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from './../../../../shared/logger/logger.service';
import { Injectable, HttpException } from '@nestjs/common';
import { UserOutput } from '../user/dtos/user-output.dto';
import { RegisterInput } from '../user/dtos/register-input.dto';

const pathAuth = 'v1/api/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: AppLogger,
    private readonly configService: ConfigService,
    private readonly httpService: HttpRequestService,
    private readonly jwtService: JwtService,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async getUserWithToken(ctx: RequestContext): Promise<[string, number]> {
    this.logger.log(ctx, `${this.getUserWithToken.name} was called`);

    const payload = { ...ctx.user };
    const token = this.jwtService.sign(payload);

    return [token, +this.configService.get<string>('jwt.expirationTime')];
  }

  async register(
    ctx: RequestContext,
    registerInput: RegisterInput,
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.register.name} was called`);

    const userApi = this.configService.get<string>('microservice.user');

    const apiUrl = `${userApi}/${pathAuth}/register`;

    const res = await this.httpService.post(ctx, apiUrl, registerInput);

    if (res.error) {
      throw new HttpException(res.error.details, res.error.statusCode);
    }

    return plainToInstance(UserOutput, res.data, {
      excludeExtraneousValues: true,
    });
  }

  async getAuthenticatedUser(
    ctx: RequestContext,
    account: string,
    password: string,
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.getAuthenticatedUser.name} was called`);

    const userApi = this.configService.get<string>('microservice.user');

    const apiUrl = `${userApi}/${pathAuth}/login`;

    const user = await this.httpService.post(ctx, apiUrl, {
      account,
      password,
    });

    if (user.error) {
      throw new HttpException(user.error.details, user.error.statusCode);
    }

    return plainToInstance(UserOutput, user.data, {
      excludeExtraneousValues: true,
    });
  }
}
