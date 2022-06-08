import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from './../../../../../shared/guards/jwt-auth.guard';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { UserService } from './../services/user.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReqContext } from '../../../../../shared/request-context/req-context.decorator';
import { BaseApiResponse } from '../../../../../shared/dtos/base-api-response.dto';
import { UserOutput } from '../dtos/user-output.dto';

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
}
