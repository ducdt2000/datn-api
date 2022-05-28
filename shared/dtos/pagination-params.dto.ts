import { ErrDetailCode, ErrMicroserviceCode } from './../constants/errors';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { ErrCategoryCode } from 'shared/constants/errors';
import { DetailErrorCode } from 'shared/errors/detail-error-code';

export class PaginationParams {
  @ApiPropertyOptional({
    description: 'Optional, defaults to 100',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  limit = 100;

  @ApiPropertyOptional({
    description: 'Optional, defaults to 0',
    type: Number,
  })
  @IsNumber()
  @Min(0, {
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.INVALID_PARAM,
        ErrMicroserviceCode.UNEXPECTED,
        ErrDetailCode.OFFSET,
        'Offset must be greater than or equal to 0',
      ),
    },
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  offset = 0;
}
