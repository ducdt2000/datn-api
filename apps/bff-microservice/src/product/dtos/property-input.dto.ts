import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { TransformTrimSpace } from '../../../../../shared/decorators/transform-trim-space.decorator';

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
    type: [],
  })
  @IsArray(errValues)
  values: any[];
}
