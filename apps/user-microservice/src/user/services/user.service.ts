import { ConfigService } from '@nestjs/config';
import { ChangeUserInfo } from './../dtos/change-user-info.dto';
import { UserQuery } from './../dtos/user-query.dto';
import { User } from './../entities/user.entity';
import { ROLE, USER_ACTIVE } from './../../../../../shared/constants/common';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { plainToInstance } from 'class-transformer';
import {
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { ErrCategoryCode } from '../../../../../shared/constants/errors';
import { DetailErrorCode } from '../../../../../shared/errors/detail-error-code';
import { UserRepository } from './../repositories/user.repository';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserOutput } from '../dtos/user-output.dto';
import { UserInput } from '../dtos/user-input.dto';
import { HttpRequestService } from 'shared/http-request/http-request.service';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: AppLogger,
    private readonly userRepository: UserRepository,
    private readonly httpService: HttpRequestService,
    private readonly configService: ConfigService,
  ) {
    this.logger.setContext(UserService.name);
  }

  async getByLogin(
    ctx: RequestContext,
    account: string,
    loginType = 'USERNAME',
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.getByLogin.name} was called`);

    let user: User;
    if (loginType === 'EMAIL' || loginType === 'PHONE') {
      user = await this.userRepository.findOne({ [loginType]: account });
      if (!user) {
        throw new NotFoundException(
          new DetailErrorCode(
            ErrCategoryCode.INVALID_PARAM,
            ErrMicroserviceCode.USER,
            ErrDetailCode['loginType'],
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

    return plainToInstance(UserOutput, user, { excludeExtraneousValues: true });
  }

  async createUser(
    ctx: RequestContext,
    userInput: UserInput,
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.createUser.name} was called`);

    const { username, email, phone } = userInput;
    const dbUsers = await this.userRepository.find({
      where: [{ username }, { email }, { phone }],
    });

    if (dbUsers.length) {
      let errorArr = [];
      dbUsers.forEach((user) => {
        if (user.username === userInput.username) {
          errorArr.push(
            new DetailErrorCode(
              ErrCategoryCode.DUPLICATE_VALUE,
              ErrMicroserviceCode.USER,
              ErrDetailCode.USERNAME,
              'Username already existed',
            ),
          );
        }
        if (user.email === userInput.email) {
          errorArr.push(
            new DetailErrorCode(
              ErrCategoryCode.DUPLICATE_VALUE,
              ErrMicroserviceCode.USER,
              ErrDetailCode.EMAIL,
              'Email already existed',
            ),
          );
        }
        if (user.phone === userInput.phone) {
          errorArr.push(
            new DetailErrorCode(
              ErrCategoryCode.DUPLICATE_VALUE,
              ErrMicroserviceCode.USER,
              ErrDetailCode.PHONE,
              'Phone already existed',
            ),
          );
        }
      });
      throw new BadRequestException(errorArr);
    }

    const newUser = this.userRepository.create(userInput);

    if (newUser.role === ROLE.USER || newUser.role === ROLE.GUEST) {
      newUser.isActive = 1;
    } else {
      newUser.isActive = 0;
    }

    const savedUser = await this.userRepository.save(newUser);

    return plainToInstance(UserOutput, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  async getUser(ctx: RequestContext, id: string): Promise<UserOutput> {
    this.logger.log(ctx, `${this.getUser.name} was called`);

    const user = await this.userRepository.getById(id);
    return plainToInstance(UserOutput, user, { excludeExtraneousValues: true });
  }

  async getUsers(
    ctx: RequestContext,
    query: UserQuery,
  ): Promise<[UserOutput[], number]> {
    this.logger.log(ctx, `${this.getUsers.name} was called`);

    const [users, count] = await this.userRepository.getByConditions(query);

    return [
      plainToInstance(UserOutput, users, { excludeExtraneousValues: true }),
      count,
    ];
  }

  async archiveUser(
    ctx: RequestContext,
    id: string,
    active: boolean,
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.archiveUser.name} was called`);

    const user = await this.userRepository.getById(id);
    user.isActive = active ? USER_ACTIVE.ACTIVE : USER_ACTIVE.INACTIVE;

    const savedUser = await this.userRepository.save(user);

    return plainToInstance(UserOutput, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  async updateUser(
    ctx: RequestContext,
    input: ChangeUserInfo,
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.updateUser.name} was called`);

    const user = await this.userRepository.getById(ctx.user.id);
    this.userRepository.merge(user, input);

    const savedUser = await this.userRepository.save(user);
    return plainToInstance(UserOutput, savedUser, {
      excludeExtraneousValues: true,
    });
  }
}
