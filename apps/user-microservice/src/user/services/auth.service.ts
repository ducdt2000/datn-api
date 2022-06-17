import { ConfigService } from '@nestjs/config';
import {
  ErrCategoryCode,
  ErrDetailCode,
  ErrMicroserviceCode,
} from '../../../../../shared/constants/errors';
import { DetailErrorCode } from '../../../../../shared/errors/detail-error-code';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import {
  PHONE_REGEX,
  EMAIL_REGEX,
} from '../../../../../shared/constants/common';
import { UserInput } from '../dtos/user-input.dto';
import { RequestContext } from '../../../../../shared/request-context/request-context.dto';
import { plainToInstance } from 'class-transformer';
import { UserService } from './user.service';
import { AppLogger } from '../../../../../shared/logger/logger.service';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { RegisterInput } from '../dtos/register-input.dto';
import * as bcrypt from 'bcrypt';
import { UserOutput } from '../dtos/user-output.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: AppLogger,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async register(
    ctx: RequestContext,
    registerInput: RegisterInput,
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.register.name} was called`);

    const hashedPassword = await bcrypt.hash(registerInput.password, 10);

    const userInput = plainToInstance(UserInput, {
      ...registerInput,
      password: hashedPassword,
    });

    return this.userService.createUser(ctx, userInput);
  }

  async getAuthenticatedUser(
    account: string,
    password: string,
  ): Promise<UserOutput> {
    let user: User;

    if (account.match(PHONE_REGEX)) {
      user = await this.userRepository.findOne({ phone: account });
      if (!user) {
        throw new NotFoundException(
          new DetailErrorCode(
            ErrCategoryCode.INVALID_PARAM,
            ErrMicroserviceCode.USER,
            ErrDetailCode.PHONE,
            'User not found',
          ),
        );
      }
    } else if (account.match(EMAIL_REGEX)) {
      user = await this.userRepository.findOne({ email: account });
      if (!user) {
        throw new NotFoundException(
          new DetailErrorCode(
            ErrCategoryCode.INVALID_PARAM,
            ErrMicroserviceCode.USER,
            ErrDetailCode.EMAIL,
            'User not found',
          ),
        );
      }
    } else {
      user = await this.userRepository.findOne({ username: account });
      if (!user) {
        throw new NotFoundException(
          new DetailErrorCode(
            ErrCategoryCode.INVALID_PARAM,
            ErrMicroserviceCode.USER,
            ErrDetailCode.USERNAME,
            'User not found',
          ),
        );
      }
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException(
        new DetailErrorCode(
          ErrCategoryCode.INVALID_PARAM,
          ErrMicroserviceCode.USER,
          ErrDetailCode.PASSWORD,
          'Wrong password',
        ),
      );
    }
    return plainToInstance(UserOutput, user, { excludeExtraneousValues: true });
  }

  // async getToken(ctx: RequestContext): Promise<[string, number]> {
  //   this.logger.log(ctx, `${this.getToken.name} was called`);

  //   const payload = { ...ctx.user };
  //   const token = this.jwtService.sign(payload);
  //   return [token, +this.configService.get<string>('jwt.expirationTime')];
  // }
}
