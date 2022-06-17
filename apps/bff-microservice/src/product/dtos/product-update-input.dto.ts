import {
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { ErrCategoryCode } from '../../../../../shared/constants/errors';
import { DetailErrorCode } from '../../../../../shared/errors/detail-error-code';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class ProductUpdateInput {
  @ApiPropertyOptional()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  productTypeId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  brandId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsUrl(
    {},
    {
      each: true,
      context: {
        detail: new DetailErrorCode(
          ErrCategoryCode.REQUIRED_PARAM,
          ErrMicroserviceCode.PRODUCT,
          ErrDetailCode.LINK,
        ),
      },
    },
  )
  imageLinks: string[];

  @ApiPropertyOptional({
    example: 'http://google.com',
  })
  @IsOptional()
  @IsUrl(
    {},
    {
      each: true,
      context: {
        detail: new DetailErrorCode(
          ErrCategoryCode.REQUIRED_PARAM,
          ErrMicroserviceCode.PRODUCT,
          ErrDetailCode.LINK,
        ),
      },
    },
  )
  defaultImageLink?: string;

  @ApiPropertyOptional({
    example: 0,
  })
  @IsOptional()
  @IsInt({
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.REQUIRED_PARAM,
        ErrMicroserviceCode.PRODUCT,
        ErrDetailCode.COUNT,
      ),
    },
  })
  countInStock?: number;
}
