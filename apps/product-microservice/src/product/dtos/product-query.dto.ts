import {
  PRODUCT_ORDER_BY,
  ORDER_TYPE,
} from './../../../../../shared/constants/common';
import {
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { ErrCategoryCode } from 'shared/constants/errors';
import { DetailErrorCode } from 'shared/errors/detail-error-code';
import { IsDateBefore } from './../../../../../shared/decorators/is-date-before.decorator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, Validate } from 'class-validator';
import { TransformToDatetime } from 'shared/decorators/transform-to-date.decorator';
import { PaginationParams } from './../../../../../shared/dtos/pagination-params.dto';
export class ProductQuery extends PaginationParams {
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  brand?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Validate(IsDateBefore, ['dateTo'], {
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
