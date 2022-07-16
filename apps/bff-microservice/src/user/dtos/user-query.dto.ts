import { PaginationParams } from './../../../../../shared/dtos/pagination-params.dto';
import {
  GENDER,
  ROLE,
  USER_ACTIVE,
  USER_ORDER_BY,
} from './../../../../../shared/constants/common';
import {
  ErrCategoryCode,
  ErrDetailCode,
  ErrMicroserviceCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { IsDateBeforeOrEqual } from './../../../../../shared/decorators/is-date-before-or-equal.decorator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBooleanString, IsEnum, IsOptional, Validate } from 'class-validator';
import { TransformToDatetime } from './../../../../../shared/decorators/transform-to-date.decorator';
import { Type } from 'class-transformer';
import { ORDER_TYPE } from '../../../../../shared/constants/common';

export class UserQuery extends PaginationParams {
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  district?: string;

  @ApiPropertyOptional({
    enum: GENDER,
  })
  @IsOptional()
  @IsEnum(GENDER, {
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.INVALID_PARAM,
        ErrMicroserviceCode.USER,
        ErrDetailCode.GENDER,
      ),
    },
  })
  gender?: number;

  @ApiPropertyOptional({
    enum: ROLE,
  })
  @IsOptional()
  @IsEnum(ROLE, {
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.INVALID_PARAM,
        ErrMicroserviceCode.USER,
        ErrDetailCode.ROLE,
      ),
    },
  })
  role?: string;

  @ApiPropertyOptional({
    enum: USER_ACTIVE,
  })
  @IsOptional()
  status?: number;

  @ApiPropertyOptional()
  @IsBooleanString()
  @IsOptional()
  withDelete?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @Validate(IsDateBeforeOrEqual, ['dateTo'], {
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.INVALID_PARAM,
        ErrMicroserviceCode.USER,
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
  orderBy: USER_ORDER_BY;

  @ApiPropertyOptional()
  @IsOptional()
  orderType: ORDER_TYPE;
}
