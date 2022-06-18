import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from '../../../../../shared/errors/detail-error-code';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class ProductTypeInput {
  @ApiProperty()
  @IsNotEmpty({
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.REQUIRED_PARAM,
        ErrMicroserviceCode.PRODUCT,
        ErrDetailCode.NAME,
      ),
    },
  })
  @Expose()
  name: string;

  @ApiProperty()
  @IsNotEmpty({
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.REQUIRED_PARAM,
        ErrMicroserviceCode.PRODUCT,
        ErrDetailCode.CODE,
      ),
    },
  })
  @Expose()
  code: string;
}
