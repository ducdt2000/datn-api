import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthenticationGuard } from './../../../../../shared/guards/local-authentication.guard';
import { LoginInput } from './../dtos/login-input.dto';
import { BaseApiResponse } from '../../../../../shared/dtos/base-api-response.dto';
import { ReqContext } from '../../../../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../../../../shared/request-context/request-context.dto';
import { RegisterInput } from '../dtos/register-input.dto';
import { AuthService } from '../services/auth.service';
import { AppLogger } from '../../../../../shared/logger/logger.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserOutput } from '../dtos/user-output.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserTokenOutput } from '../dtos/user-token-output.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly logger: AppLogger,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
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

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthenticationGuard)
  async login(
    @ReqContext() ctx: RequestContext,
  ): Promise<BaseApiResponse<UserTokenOutput>> {
    this.logger.log(ctx, `${this.login.name} was called`);

    const [token, exp] = await this.authService.getToken(ctx);

    const data = plainToInstance(
      UserTokenOutput,
      { token, detail: { ...ctx.user, exp } },
      { excludeExtraneousValues: true },
    );

    return { data };
  }
}
