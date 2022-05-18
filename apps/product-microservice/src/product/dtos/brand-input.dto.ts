import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from 'shared/errors/detail-error-code';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BRAND_TYPE } from './../../../../../shared/constants/common';
export class BrandInput {
  @ApiProperty()
  @IsNotEmpty({
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.INVALID_PARAM,
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
        ErrCategoryCode.INVALID_PARAM,
        ErrMicroserviceCode.PRODUCT,
        ErrDetailCode.TYPE,
      ),
    },
  })
  type: BRAND_TYPE;
}
