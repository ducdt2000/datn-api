import { plainToInstance } from 'class-transformer';
import {
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { ErrCategoryCode } from 'shared/constants/errors';
import { DetailErrorCode } from 'shared/errors/detail-error-code';
import { UserRepository } from './../repositories/user.repository';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserOutput } from '../dtos/user-output.dto';
import { UserInput } from '../dtos/user-input.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: AppLogger,
    private readonly userRepository: UserRepository,
  ) {
    this.logger.setContext(UserService.name);
  }

  async getByUsername(username: string): Promise<UserOutput> {
    const user = await this.userRepository.findOne({ username });

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
    return plainToInstance(UserOutput, user, { excludeExtraneousValues: true });
  }

  async createUser(userInput: UserInput): Promise<UserOutput> {
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
    const savedUser = await this.userRepository.save(newUser);

    return plainToInstance(UserOutput, savedUser, {
      excludeExtraneousValues: true,
    });
  }
}
