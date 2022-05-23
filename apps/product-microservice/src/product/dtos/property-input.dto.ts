import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { PropertyValueInput } from './property-value-input.dto';
import { Type } from 'class-transformer';
import { TransformTrimSpace } from 'shared/decorators/transform-trim-space.decorator';

const errName = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.NAME,
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

export class PropertyInput {
  @ApiProperty()
  @IsNotEmpty(errName)
  @TransformTrimSpace()
  name: string;

  @ApiProperty({
    type: [PropertyValueInput],
  })
  @IsArray(errValues)
  @Type(() => PropertyValueInput)
  @ValidateNested({ ...errValues, each: true })
  values: PropertyValueInput[];
}
