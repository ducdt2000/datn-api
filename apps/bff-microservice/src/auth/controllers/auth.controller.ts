import { USER_ACTIVE } from './../../../../../shared/constants/common';
import { BaseApiResponse } from './../../../../../shared/dtos/base-api-response.dto';
import { LoginInput } from './../../user/dtos/login-input.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth.service';
import { ReqContext } from 'shared/request-context/req-context.decorator';
import { RegisterInput } from '../../user/dtos/register-input.dto';
import { UserOutput } from '../../user/dtos/user-output.dto';
import { plainToInstance } from 'class-transformer';
import { UserTokenOutput } from '../../user/dtos/user-token-output.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly logger: AppLogger,
    private readonly authService: AuthService,
  ) {
    this.logger.setContext(AuthController.name);
  }

  @Post('login')
  async login(@ReqContext() ctx: RequestContext, @Body() input: LoginInput) {
    this.logger.log(ctx, `${this.login.name} was called`);

    const data = await this.authService.getAuthenticatedUser(
      ctx,
      input.account,
      input.password,
    );

    ctx.user = data;

    if (data.isActive !== USER_ACTIVE.ACTIVE) {
      return { data };
    }
    const [token, exp] = await this.authService.getUserWithToken(ctx);

    const dataReturn = plainToInstance(
      UserTokenOutput,
      { token, detail: { ...ctx.user, exp } },
      { excludeExtraneousValues: true },
    );

    return { data: dataReturn };
  }

  @Post('register')
  async register(
    @ReqContext() ctx: RequestContext,
    @Body() registerInput: RegisterInput,
  ): Promise<BaseApiResponse<UserOutput>> {
    this.logger.log(ctx, `${this.register.name} was called`);

    const data = await this.authService.register(ctx, registerInput);
    return { data };
  }
}
