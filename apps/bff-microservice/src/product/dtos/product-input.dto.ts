import { PropertyInput } from './property-input.dto';
import { TransformTrimSpace } from '../../../../../shared/decorators/transform-trim-space.decorator';
import {
  ErrCategoryCode,
  ErrDetailCode,
  ErrMicroserviceCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

const errStarPoint = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.STAR_POINT,
    ),
  },
};

const errDescription = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.DESCRIPTION,
    ),
  },
};

const errSlug = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.SLUG,
    ),
  },
};

export class ProductInput {
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
  @TransformTrimSpace()
  name: string;

  @ApiProperty()
  @IsNotEmpty({
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.REQUIRED_PARAM,
        ErrMicroserviceCode.PRODUCT,
        ErrDetailCode.CODE,
      ),
    },
  })
  @TransformTrimSpace()
  code: string;

  @ApiProperty()
  @IsNotEmpty({
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.REQUIRED_PARAM,
        ErrMicroserviceCode.PRODUCT,
        ErrDetailCode.ID,
      ),
    },
  })
  @TransformTrimSpace()
  productTypeId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, errStarPoint)
  starPoint: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString(errDescription)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @TransformTrimSpace()
  @IsString(errSlug)
  slug?: string;

  @ApiProperty()
  @IsNotEmpty({
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.REQUIRED_PARAM,
        ErrMicroserviceCode.PRODUCT,
        ErrDetailCode.ID,
      ),
    },
  })
  @TransformTrimSpace()
  brandId: string;

  @ApiProperty()
  @IsNotEmpty({
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.REQUIRED_PARAM,
        ErrMicroserviceCode.PRODUCT,
        ErrDetailCode.PRICE,
      ),
    },
  })
  price: number;

  @ApiProperty({
    example: ['http://google.com', 'http://facebook.com'],
  })
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
  @IsNotEmpty({
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.REQUIRED_PARAM,
        ErrMicroserviceCode.PRODUCT,
        ErrDetailCode.ID,
      ),
    },
  })
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
  countInStock: number = 0;

  @ApiProperty({
    type: [PropertyInput],
    example: [{ name: 'color', values: ['red', 'green', 'blue'] }],
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PropertyInput)
  @IsArray()
  @IsObject({ each: true })
  properties: PropertyInput[];
}
