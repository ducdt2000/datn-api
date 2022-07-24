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
import { IsEnum, IsOptional, Validate } from 'class-validator';
export class OrderQuery extends PaginationParams {
  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  warehouseId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  paymentMethodId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  deliveryMethodId?: number;

  @ApiPropertyOptional()
  @IsOptional()
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
  @IsOptional()
  @Type(() => Date)
  from?: Date;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  to?: Date;

  @ApiPropertyOptional()
  // @IsEnum(ORDER_ORDER_BY)
  @Expose()
  @IsOptional()
  orderBy?: ORDER_ORDER_BY;

  @ApiPropertyOptional()
  // @IsEnum(ORDER_TYPE)
  @Expose()
  @IsOptional()
  orderType?: ORDER_TYPE;
}
