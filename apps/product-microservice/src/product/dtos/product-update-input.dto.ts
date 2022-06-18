import {
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { ErrCategoryCode } from '../../../../../shared/constants/errors';
import { DetailErrorCode } from '../../../../../shared/errors/detail-error-code';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { PropertyInput } from './property-input.dto';
import { Expose, Type } from 'class-transformer';

export class ProductUpdateInput {
  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  productTypeId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  brandId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Expose()
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @Expose()
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
    type: [PropertyInput],
    example: [{ name: 'color', values: ['red', 'green', 'blue'] }],
  })
  @IsOptional()
  @Expose()
  @ValidateNested()
  @Type(() => PropertyInput)
  @IsArray()
  @IsObject({ each: true })
  properties: PropertyInput[];

  @ApiPropertyOptional({
    example: 'http://google.com',
  })
  @IsOptional()
  @Expose()
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
  @Expose()
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
