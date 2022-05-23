import { TransformTrimSpace } from 'shared/decorators/transform-trim-space.decorator';
import {
  ErrCategoryCode,
  ErrDetailCode,
  ErrMicroserviceCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductVersionInput } from './product-version-input.dto';
import { Type } from 'class-transformer';

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

const errVersion = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.PRODUCT_VERSION,
    ),
  },
};

export class ProductInput {
  @ApiProperty()
  @IsNotEmpty(errName)
  @TransformTrimSpace()
  name: string;

  @ApiProperty()
  @IsNotEmpty(errCode)
  @TransformTrimSpace()
  code: string;

  @ApiProperty()
  @IsNotEmpty(errId)
  @TransformTrimSpace()
  productTypeId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, errStarPoint)
  @TransformTrimSpace()
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

  @ApiPropertyOptional()
  @IsOptional()
  @TransformTrimSpace()
  defaultVersionId?: string;

  @ApiProperty()
  @IsNotEmpty(errId)
  @TransformTrimSpace()
  brandId: string;

  @ApiProperty({ type: [ProductVersionInput] })
  @IsArray(errVersion)
  @IsNotEmpty(errVersion)
  @IsObject({ ...errVersion, each: true })
  @ValidateNested({ ...errVersion, each: true })
  @Type(() => ProductVersionInput)
  productVersions: ProductVersionInput[];
}
