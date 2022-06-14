import { ROLE } from './../../../../../shared/constants/common';
import { RoleGuard } from './../../../../../shared/guards/role.guard';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from './../../../../../shared/guards/jwt-auth.guard';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { UserService } from './../services/user.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReqContext } from '../../../../../shared/request-context/req-context.decorator';
import { BaseApiResponse } from '../../../../../shared/dtos/base-api-response.dto';
import { UserOutput } from '../dtos/user-output.dto';
import { UserQuery } from '../dtos/user-query.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly logger: AppLogger,
    private readonly userService: UserService,
  ) {
    this.logger.setContext(UserController.name);
  }

  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard, RoleGuard(ROLE.ADMIN, ROLE.STAFF))
  async getUsers(
    @ReqContext() ctx: RequestContext,
    @Query() query: UserQuery,
  ): Promise<BaseApiResponse<UserOutput[]>> {
    this.logger.log(ctx, `${this.getUsers.name} was called`);

    const [data, count] = await this.userService.getUsers(ctx, query);
    return { data, meta: { count } };
  }
}
