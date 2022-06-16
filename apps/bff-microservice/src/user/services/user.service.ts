import { plainToInstance } from 'class-transformer';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ConfigService } from '@nestjs/config';
import { HttpRequestService } from './../../../../../shared/http-request/http-request.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserQuery } from '../dtos/user-query.dto';
import { UserOutput } from '../dtos/user-output.dto';
import { TokenDetailOutput } from '../dtos/token-detail-output.dto';
import { LoginInput } from '../dtos/login-input.dto';

const pathUsers = '/users';
const pathAuth = '/auth';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: AppLogger,
    private httpService: HttpRequestService,
    private configService: ConfigService,
  ) {
    this.logger.setContext(UserService.name);
  }

  async getUsers(
    ctx: RequestContext,
    userQuery: UserQuery,
  ): Promise<[UserOutput[], number]> {
    this.logger.log(ctx, `${this.getUsers.name} was called`);

    const userMicroserviceUrl =
      this.configService.get<string>('microservice.user');

    const apiUrl = `${userMicroserviceUrl}${pathUsers}`;

    this.logger.log(ctx, 'calling user-microservice getUsers');

    const users = await this.httpService.get<UserOutput[]>(ctx, apiUrl, {
      params: userQuery,
    });

    return [users.data, users.meta.count];
  }

  async getUserAccessInfo(
    ctx: RequestContext,
    id: string,
  ): Promise<TokenDetailOutput> {
    this.logger.log(ctx, `${this.getUserAccessInfo.name} was called`);
    const userMicroserviceUrl =
      this.configService.get<string>('microservice.user');
    const apiUrl = `${userMicroserviceUrl}${pathUsers}/${id}`;
    this.logger.log(ctx, 'calling user-microservice getUser');
    const accessinfo = await this.httpService.get<TokenDetailOutput>(
      ctx,
      apiUrl,
    );

    if (accessinfo.error) {
      throw new UnauthorizedException(accessinfo.error);
    }

    return plainToInstance(TokenDetailOutput, accessinfo);
  }
}
