import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import {
  ORDER_TYPE,
  WAREHOUSE_ORDER_BY,
  WAREHOUSE_STATUS,
} from './../../../../../shared/constants/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationParams } from './../../../../../shared/dtos/pagination-params.dto';
export class WarehouseQuery extends PaginationParams {
  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  managerUserId?: string;

  @Expose()
  @ApiPropertyOptional({
    enum: WAREHOUSE_STATUS,
  })
  @IsEnum(WAREHOUSE_STATUS, {
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.INVALID_PARAM,
        ErrMicroserviceCode.WAREHOUSE,
        ErrDetailCode.STATUS,
      ),
    },
  })
  status?: number;

  @Expose()
  @ApiPropertyOptional({
    enum: WAREHOUSE_ORDER_BY,
  })
  @IsEnum(WAREHOUSE_ORDER_BY, {
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
