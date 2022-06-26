import {
  ORDER_ORDER_BY,
  ORDER_TYPE,
} from './../../../../../shared/constants/common';
import {
  ErrCategoryCode,
  ErrDetailCode,
  ErrMicroserviceCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsTimeBefore } from 'shared/decorators/is-time-before.decorator';
import { PaginationParams } from './../../../../../shared/dtos/pagination-params.dto';
import { IsEnum, Validate } from 'class-validator';
export class OrderQuery extends PaginationParams {
  @ApiPropertyOptional()
  @Expose()
  search?: string;

  @ApiPropertyOptional()
  @Expose()
  userId?: string;

  @ApiPropertyOptional()
  @Expose()
  warehouseId?: string;

  @ApiPropertyOptional()
  @Expose()
  paymentMethodId?: number;

  @ApiPropertyOptional()
  @Expose()
  deliveryMethodId?: number;

  @ApiPropertyOptional()
  @Expose()
  status?: number;

  @Validate(IsTimeBefore, ['to'], {
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.INVALID_PARAM,
        ErrMicroserviceCode.ORDER,
        ErrDetailCode.FROM,
      ),
    },
  })
  @ApiPropertyOptional()
  @Expose()
  @Type(() => Date)
  from?: Date;

  @ApiPropertyOptional()
  @Expose()
  to?: Date;

  @ApiPropertyOptional()
  @IsEnum(ORDER_ORDER_BY)
  @Expose()
  orderBy?: ORDER_ORDER_BY;

  @ApiPropertyOptional()
  @IsEnum(ORDER_TYPE)
  @Expose()
  orderType?: ORDER_TYPE;
}
