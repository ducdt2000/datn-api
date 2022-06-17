import { ROLE } from './../../../../shared/constants/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { RequestContext } from './../../../../shared/request-context/request-context.dto';
import { HttpRequestService } from './../../../../shared/http-request/http-request.service';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from './../../../../shared/logger/logger.service';
import { Injectable, HttpException } from '@nestjs/common';
import { UserOutput } from '../user/dtos/user-output.dto';
import { RegisterInput } from '../user/dtos/register-input.dto';
import { CartOutput } from '../user/dtos/cart-output.dto';

const pathAuth = 'v1/api/auth';
const pathCarts = 'v1/api/carts';

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
    const resUser = await this.httpService.post<UserOutput>(
      ctx,
      apiUrl,
      registerInput,
    );

    if (resUser.error) {
      throw new HttpException(resUser.error.details, resUser.error.statusCode);
    }

    if (resUser.data.role === ROLE.USER) {
      const cartApi = this.configService.get<string>('microservice.cart');
      const cartApiUrl = `${cartApi}/${pathCarts}`;
      const resCart = await this.httpService.post<CartOutput>(ctx, cartApiUrl, {
        userId: resUser.data.id,
      });

      if (resCart.error) {
        throw new HttpException(
          resCart.error.details,
          resCart.error.statusCode,
        );
      }

      resUser.data.cartId = resCart.data.id;
    }

    return plainToInstance(UserOutput, resUser.data, {
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
