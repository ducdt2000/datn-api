import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { IsDateBefore } from './../../../../../shared/decorators/is-date-before.decorator';
import {
  BRAND_ORDER_BY,
  BRAND_TYPE,
  ORDER_TYPE,
} from './../../../../../shared/constants/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, Validate } from 'class-validator';
import { Expose } from 'class-transformer';
import { TransformToDatetime } from './../../../../../shared/decorators/transform-to-date.decorator';

const errOrderType = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.ORDER_TYPE,
    ),
  },
};

const errOrderBy = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.ORDER_BY,
    ),
  },
};

const errDateFrom = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.FROM,
    ),
  },
};

const errDateTo = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.TO,
    ),
  },
};

export class BrandQuery {
  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  type: BRAND_TYPE;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  search: string;

  @ApiPropertyOptional({ enum: BRAND_ORDER_BY })
  @IsOptional()
  @Expose()
  @IsEnum(BRAND_ORDER_BY, errOrderBy)
  orderBy: BRAND_ORDER_BY;

  @ApiPropertyOptional({ enum: ORDER_TYPE })
  @IsOptional()
  @Expose()
  @IsEnum(ORDER_TYPE, errOrderType)
  orderType: ORDER_TYPE;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  @IsDate(errDateFrom)
  @Validate(IsDateBefore, ['createdTo'], errDateFrom)
  @TransformToDatetime({ startOf: 'day' })
  createdFrom: Date;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  @IsDate(errDateTo)
  @TransformToDatetime({ endOf: 'day' })
  createdTo: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  @IsDate(errDateFrom)
  @TransformToDatetime({ startOf: 'day' })
  @Validate(IsDateBefore, ['updatedTo'], errDateFrom)
  updatedFrom: Date;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  @TransformToDatetime({ endOf: 'day' })
  @IsDate(errDateTo)
  updatedTo: Date;

  // @ApiPropertyOptional()
  // @IsOptional()
  // @Expose()
  // @IsDate(errDateFrom)
  // @Validate(IsDateBefore, ['deletedTo'], errDateFrom)
  // deletedFrom: Date;

  // @ApiPropertyOptional()
  // @Expose()
  // @IsOptional()
  // @IsDate(errDateTo)
  // deletedTo: Date;
}
