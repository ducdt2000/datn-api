import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { BRAND_TYPE } from './../../../../../shared/constants/common';
import { Expose } from 'class-transformer';
export class BrandInput {
  @ApiProperty()
  @IsNotEmpty({
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.REQUIRED_PARAM,
        ErrMicroserviceCode.PRODUCT,
        ErrDetailCode.NAME,
      ),
    },
  })
  @Expose()
  name: string;

  @ApiProperty({
    examples: BRAND_TYPE,
    default: BRAND_TYPE.LOCAL,
  })
  @IsNotEmpty({
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.REQUIRED_PARAM,
        ErrMicroserviceCode.PRODUCT,
        ErrDetailCode.TYPE,
      ),
    },
  })
  @IsEnum(BRAND_TYPE, {
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.INVALID_PARAM,
        ErrMicroserviceCode.PRODUCT,
        ErrDetailCode.TYPE,
      ),
    },
  })
  @Expose()
  type: BRAND_TYPE;

  @ApiPropertyOptional()
  @IsString({
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.INVALID_PARAM,
        ErrMicroserviceCode.PRODUCT,
        ErrDetailCode.TYPE,
      ),
    },
  })
  @Expose()
  @IsOptional()
  slug?: string;
}
