import { ROLE } from './../../../../../shared/constants/common';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ConfigService } from '@nestjs/config';
import { HttpRequestService } from './../../../../../shared/http-request/http-request.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { HttpException, Injectable } from '@nestjs/common';
import { UserQuery } from '../dtos/user-query.dto';
import { UserOutput } from '../dtos/user-output.dto';

const pathUsers = 'v1/api/users';

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

    const apiUrl = `${userMicroserviceUrl}/${pathUsers}`;

    this.logger.log(ctx, 'calling user-microservice getUsers');

    const users = await this.httpService.get<UserOutput[]>(ctx, apiUrl, {
      params: userQuery,
    });

    return [users.data, users.meta?.count];
  }

  async getManagers(
    ctx: RequestContext,
    userId?: string,
    userIds?: string[],
    query?: UserQuery,
  ) {
    const managers: UserOutput[] = [];

    if (userId) {
      const user = await this.getUser(ctx, userId);
      managers.push(user);
      return managers;
    } else {
      const [staffs, admins] = await Promise.all([
        this.getUsers(ctx, {
          ...query,
          role: ROLE.STAFF,
          limit: 10000,
          offset: 0,
          orderBy: null,
          orderType: null,
        }),
        this.getUsers(ctx, {
          ...query,
          role: ROLE.ADMIN,
          limit: 10000,
          offset: 0,
          orderBy: null,
          orderType: null,
        }),
      ]);

      managers.push(...staffs[0], ...admins[0]);

      if (userIds) {
        return managers.filter((m) => userIds.includes(m.id));
      } else {
        return managers;
      }
    }
  }

  async getUser(ctx: RequestContext, id: string): Promise<UserOutput> {
    this.logger.log(ctx, `${this.getUser.name} was called`);

    const userMicroserviceUrl =
      this.configService.get<string>('microservice.user');

    const apiUrl = `${userMicroserviceUrl}/${pathUsers}/${id}`;

    this.logger.log(ctx, 'calling user-microservice getUser');

    const response = await this.httpService.get<UserOutput>(ctx, apiUrl);
    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }
    return response.data;
  }

  async archiveUser(
    ctx: RequestContext,
    id: string,
    active: boolean,
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.archiveUser.name} was called`);

    const userMicroserviceUrl =
      this.configService.get<string>('microservice.user');

    const action = active ? 'unlock-account' : 'lock-account';
    const apiUrl = `${userMicroserviceUrl}/${pathUsers}/${action}`;

    this.logger.log(ctx, `calling user-microservice ${action}`);

    const response = await this.httpService.post<UserOutput>(ctx, apiUrl, {
      userId: id,
    });
    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }
    return response.data;
  }

  // async getUserAccessInfo(
  //   ctx: RequestContext,
  //   id: string,
  // ): Promise<TokenDetailOutput> {
  //   this.logger.log(ctx, `${this.getUserAccessInfo.name} was called`);
  //   const userMicroserviceUrl =
  //     this.configService.get<string>('microservice.user');
  //   const apiUrl = `${userMicroserviceUrl}${pathUsers}/${id}`;
  //   this.logger.log(ctx, 'calling user-microservice getUser');
  //   const accessinfo = await this.httpService.get<TokenDetailOutput>(
  //     ctx,
  //     apiUrl,
  //   );

  //   if (accessinfo.error) {
  //     throw new UnauthorizedException(accessinfo.error);
  //   }

  //   return plainToInstance(TokenDetailOutput, accessinfo);
  // }
}
