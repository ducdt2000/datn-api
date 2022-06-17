import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from '../../../../../shared/errors/detail-error-code';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
  code: string;
}
