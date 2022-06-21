import {
  ErrCategoryCode,
  ErrDetailCode,
  ErrMicroserviceCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { IsDateBeforeOrEqual } from './../../../../../shared/decorators/is-date-before-or-equal.decorator';
import {
  ORDER_TYPE,
  WAREHOUSE_LOG_ORDER_BY,
  WAREHOUSE_LOG_TYPE,
} from './../../../../../shared/constants/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsEnum, IsOptional, Validate } from 'class-validator';
import { PaginationParams } from './../../../../../shared/dtos/pagination-params.dto';
import { TransformToDatetime } from 'shared/decorators/transform-to-date.decorator';
export class WarehouseLogQuery extends PaginationParams {
  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  userId?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(WAREHOUSE_LOG_TYPE)
  type?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  @Validate(IsDateBeforeOrEqual, ['dateTo'], {
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.INVALID_PARAM,
        ErrMicroserviceCode.WAREHOUSE,
        ErrDetailCode.FROM,
      ),
    },
  })
  @TransformToDatetime({ startOf: 'day' })
  @Type(() => Date)
  dateFrom?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  @Type(() => Date)
  @TransformToDatetime({ endOf: 'day' })
  dateTo?: Date;

  @Expose()
  @ApiPropertyOptional({
    enum: WAREHOUSE_LOG_ORDER_BY,
  })
  @IsEnum(WAREHOUSE_LOG_ORDER_BY, {
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.INVALID_PARAM,
        ErrMicroserviceCode.WAREHOUSE,
        ErrDetailCode.ORDER_BY,
      ),
    },
  })
  orderBy?: string;

  @Expose()
  @ApiPropertyOptional({
    enum: ORDER_TYPE,
  })
  @IsEnum(ORDER_TYPE, {
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.INVALID_PARAM,
        ErrMicroserviceCode.WAREHOUSE,
        ErrDetailCode.ORDER_TYPE,
      ),
    },
  })
  orderType?: ORDER_TYPE;
}
