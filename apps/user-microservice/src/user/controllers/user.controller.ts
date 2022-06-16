import { TokenDetailOutput } from './../dtos/token-detail-output.dto';
import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { ArchiveAccount } from './../dtos/archive-account.dto';
import { plainToInstance } from 'class-transformer';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { UserService } from './../services/user.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReqContext } from '../../../../../shared/request-context/req-context.decorator';
import { BaseApiResponse } from '../../../../../shared/dtos/base-api-response.dto';
import { UserOutput } from '../dtos/user-output.dto';
import { UserQuery } from '../dtos/user-query.dto';
import { ChangeUserInfo } from '../dtos/change-user-info.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly logger: AppLogger,
    private readonly userService: UserService,
  ) {
    this.logger.setContext(UserController.name);
  }

  @Get('profile')
  async getProfile(
    @ReqContext() ctx: RequestContext,
  ): Promise<BaseApiResponse<UserOutput>> {
    this.logger.log(ctx, `${this.getProfile.name} was called`);

    const data = plainToInstance(UserOutput, ctx.user, {
      excludeExtraneousValues: true,
    });
    return { data };
  }

  @Get(':id')
  async getUser(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<UserOutput>> {
    this.logger.log(ctx, `${this.getUser.name} was called`);

    const data = await this.userService.getUser(ctx, id);
    return { data };
  }

  @Get()
  async getUsers(
    @ReqContext() ctx: RequestContext,
    @Query() query: UserQuery,
  ): Promise<BaseApiResponse<UserOutput[]>> {
    this.logger.log(ctx, `${this.getUsers.name} was called`);

    const [data, count] = await this.userService.getUsers(ctx, query);
    return { data, meta: { count } };
  }

  @Post('lock-account')
  async lockAccount(
    @ReqContext() ctx: RequestContext,
    @Body() input: ArchiveAccount,
  ): Promise<BaseApiResponse<UserOutput>> {
    this.logger.log(ctx, `${this.lockAccount.name} was called`);

    // if (input.userId !== ctx.user.id && ctx.user.role !== ROLE.ADMIN) {
    //   throw new ForbiddenException(
    //     new DetailErrorCode(
    //       ErrCategoryCode.FORBIDDEN,
    //       ErrMicroserviceCode.USER,
    //       ErrDetailCode.ID,
    //       "You don't have permissions",
    //     ),
    //   );
    // }

    const data = await this.userService.archiveUser(ctx, input.userId, false);
    return { data };
  }

  @Post('unlock-account')
  async unLockAccount(
    @ReqContext() ctx: RequestContext,
    @Body() input: ArchiveAccount,
  ): Promise<BaseApiResponse<UserOutput>> {
    this.logger.log(ctx, `${this.unLockAccount.name} was called`);

    // if (input.userId !== ctx.user.id && ctx.user.role !== ROLE.ADMIN) {
    //   throw new ForbiddenException(
    //     new DetailErrorCode(
    //       ErrCategoryCode.FORBIDDEN,
    //       ErrMicroserviceCode.USER,
    //       ErrDetailCode.ID,
    //       "You don't have permissions",
    //     ),
    //   );
    // }

    const data = await this.userService.archiveUser(ctx, input.userId, true);
    return { data };
  }

  @Post('update-info')
  async changeInfo(
    @ReqContext() ctx: RequestContext,
    @Body() input: ChangeUserInfo,
  ): Promise<BaseApiResponse<UserOutput>> {
    this.logger.log(ctx, `${this.changeInfo.name} was called`);

    const data = await this.userService.updateUser(ctx, input);

    return { data };
  }
}
