import {
  ErrCategoryCode,
  ErrDetailCode,
  ErrMicroserviceCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { WAREHOUSE_STATUS } from './../../../../../shared/constants/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class ChangeStatusInput {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(WAREHOUSE_STATUS, {
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.INVALID_PARAM,
        ErrMicroserviceCode.WAREHOUSE,
        ErrDetailCode.STATUS,
      ),
    },
  })
  status: number;
}
