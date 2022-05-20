import {
  ErrCategoryCode,
  ErrDetailCode,
  ErrMicroserviceCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PropertyInput } from './property-input.dto';
import {
  ArrayMinSize,
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
import { TransformTrimSpace } from 'shared/decorators/transform-trim-space.decorator';
import { TransformTrimSpaceArray } from 'shared/decorators/transform-trim-space-array.decorator';

const errName = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.NAME,
    ),
  },
};

const errId = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.ID,
    ),
  },
};

const errCode = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.CODE,
    ),
  },
};

const errPrice = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.PRICE,
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

const errImageLink = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.LINK,
    ),
  },
};

const errCount = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.COUNT,
    ),
  },
};

const errValues = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.VALUES,
    ),
  },
};

export class ProductVersionInput {
  @ApiProperty()
  @IsNotEmpty(errName)
  @TransformTrimSpace()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @TransformTrimSpace()
  productId?: string;

  @ApiProperty()
  @IsNotEmpty(errCode)
  @TransformTrimSpace()
  code: string;

  @ApiProperty()
  @IsNotEmpty(errPrice)
  @IsNumber({}, errPrice)
  price: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString(errDescription)
  description?: string;

  @ApiProperty()
  @IsNotEmpty(errImageLink)
  @IsArray(errImageLink)
  @Type(() => String)
  @ArrayMinSize(1, errImageLink)
  @TransformTrimSpaceArray()
  @IsUrl({}, { ...errImageLink, each: true })
  imageLinks: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({}, errImageLink)
  @TransformTrimSpace()
  defaultImageLink?: string;

  @ApiProperty()
  @IsNotEmpty(errCount)
  @IsInt(errCount)
  countInStock: number;

  @ApiProperty({ type: [PropertyInput] })
  @IsNotEmpty(errValues)
  @IsArray(errValues)
  @ValidateNested({ ...errValues, each: true })
  @Type(() => PropertyInput)
  @IsObject({ ...errValues, each: true })
  properties: PropertyInput[];
}