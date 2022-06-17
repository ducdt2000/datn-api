import {
  ErrCategoryCode,
  ErrDetailCode,
  ErrMicroserviceCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { Roles } from './../../../../../shared/decorators/role.decorator';
import { RoleGuard } from './../../../../../shared/guards/role.guard';
import { JwtAuthGuard } from './../../../../../shared/guards/jwt-auth.guard';
import { BaseApiResponse } from 'shared/dtos/base-api-response.dto';
import { ReqContext } from 'shared/request-context/req-context.decorator';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserOutput } from '../dtos/user-output.dto';
import { plainToInstance } from 'class-transformer';
import { ROLE } from 'shared/constants/common';
import { UserQuery } from '../dtos/user-query.dto';
import { ArchiveAccount } from '../dtos/archive-account.dto';
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly logger: AppLogger,
    private readonly userService: UserService,
  ) {
    this.logger.setContext(UserController.name);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
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
  @Roles(ROLE.ADMIN, ROLE.STAFF)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getUser(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<UserOutput>> {
    this.logger.log(ctx, `${this.getUser.name} was called`);

    const data = await this.userService.getUser(ctx, id);
    return { data };
  }

  @Get()
  @Roles(ROLE.ADMIN, ROLE.STAFF)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getUsers(
    @ReqContext() ctx: RequestContext,
    @Query() query: UserQuery,
  ): Promise<BaseApiResponse<UserOutput[]>> {
    this.logger.log(ctx, `${this.getUsers.name} was called`);

    const [data, count] = await this.userService.getUsers(ctx, query);
    return { data, meta: { count } };
  }

  @Post('lock-account')
  @UseGuards(JwtAuthGuard)
  async lockAccount(
    @ReqContext() ctx: RequestContext,
    @Body() input: ArchiveAccount,
  ): Promise<BaseApiResponse<UserOutput>> {
    this.logger.log(ctx, `${this.lockAccount.name} was called`);

    if (input.userId !== ctx.user.id && ctx.user.role !== ROLE.ADMIN) {
      throw new ForbiddenException(
        new DetailErrorCode(
          ErrCategoryCode.FORBIDDEN,
          ErrMicroserviceCode.USER,
          ErrDetailCode.ID,
          "You don't have permissions",
        ),
      );
    }

    const data = await this.userService.archiveUser(ctx, input.userId, false);
    return { data };
  }

  @Post('unlock-account')
  @UseGuards(JwtAuthGuard)
  async unLockAccount(
    @ReqContext() ctx: RequestContext,
    @Body() input: ArchiveAccount,
  ): Promise<BaseApiResponse<UserOutput>> {
    this.logger.log(ctx, `${this.unLockAccount.name} was called`);

    if (input.userId !== ctx.user.id && ctx.user.role !== ROLE.ADMIN) {
      throw new ForbiddenException(
        new DetailErrorCode(
          ErrCategoryCode.FORBIDDEN,
          ErrMicroserviceCode.USER,
          ErrDetailCode.ID,
          "You don't have permissions",
        ),
      );
    }

    const data = await this.userService.archiveUser(ctx, input.userId, true);
    return { data };
  }
}
