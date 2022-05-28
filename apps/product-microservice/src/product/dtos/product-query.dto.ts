import { IsDateBeforeOrEqual } from './../../../../../shared/decorators/is-date-before-or-equal.decorator';
import {
  PRODUCT_ORDER_BY,
  ORDER_TYPE,
  BRAND_TYPE,
} from './../../../../../shared/constants/common';
import {
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { ErrCategoryCode } from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, Validate } from 'class-validator';
import { TransformToDatetime } from './../../../../../shared/decorators/transform-to-date.decorator';
import { PaginationParams } from './../../../../../shared/dtos/pagination-params.dto';
export class ProductQuery extends PaginationParams {
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    example: 'brand slug',
  })
  @IsOptional()
  brand?: string;

  @ApiPropertyOptional({
    example: 'local',
  })
  @IsOptional()
  brandType?: string;

  @ApiPropertyOptional({
    description: 'type code',
  })
  @IsOptional()
  type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Validate(IsDateBeforeOrEqual, ['dateTo'], {
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.INVALID_PARAM,
        ErrMicroserviceCode.PRODUCT,
        ErrDetailCode.FROM,
      ),
    },
  })
  @TransformToDatetime({ startOf: 'day' })
  @Type(() => Date)
  dateFrom?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @TransformToDatetime({ endOf: 'day' })
  dateTo?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  orderBy: PRODUCT_ORDER_BY;

  @ApiPropertyOptional()
  @IsOptional()
  orderType: ORDER_TYPE;
}
