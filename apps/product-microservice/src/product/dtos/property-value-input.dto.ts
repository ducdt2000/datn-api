import { TransformTrimSpace } from 'shared/decorators/transform-trim-space.decorator';
import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty({
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.REQUIRED_PARAM,
        ErrMicroserviceCode.PRODUCT,
        ErrDetailCode.NAME,
      ),
    },
  })
  name: string;

  // @ApiProperty()
  // @IsNotEmpty(errId)
  // @TransformTrimSpace()
  // propertyId: string;
}
