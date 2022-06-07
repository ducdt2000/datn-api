import { LoginInput } from './../dtos/login-input.dto';
import { BaseApiResponse } from '../../../../../shared/dtos/base-api-response.dto';
import { ReqContext } from '../../../../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../../../../shared/request-context/request-context.dto';
import { RegisterInput } from '../dtos/register-input.dto';
import { AuthService } from '../services/auth.service';
import { AppLogger } from '../../../../../shared/logger/logger.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserOutput } from '../dtos/user-output.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly logger: AppLogger,
    private readonly authService: AuthService,
  ) {
    this.logger.setContext(AuthController.name);
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

  @HttpCode(HttpStatus.OK)
  async login(@ReqContext() ctx: RequestContext, @Body() input: LoginInput) {
    this.logger.log(ctx, `${this.login.name} was called`);

    const data = await this.authService.getAuthenticatedUser(
      ctx,
      input.account,
      input.password,
    );
  }
}
