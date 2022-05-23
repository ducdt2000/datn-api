import { TransformTrimSpace } from 'shared/decorators/transform-trim-space.decorator';
import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

const errName = {
  context: {
    detail: new DetailErrorCode(
      ErrCategoryCode.INVALID_PARAM,
      ErrMicroserviceCode.PRODUCT,
      ErrDetailCode.NAME,
    ),
  },
};

// const errId = {
//   context: {
//     detail: new DetailErrorCode(
//       ErrCategoryCode.INVALID_PARAM,
//       ErrMicroserviceCode.PRODUCT,
//       ErrDetailCode.ID,
//     ),
//   },
// };

export class PropertyValueInput {
  @ApiProperty()
  @TransformTrimSpace()
  @IsNotEmpty(errName)
  name: string;

  // @ApiProperty()
  // @IsNotEmpty(errId)
  // @TransformTrimSpace()
  // propertyId: string;
}
