import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { BaseApiErrorObject } from './base-api-response.dto';

export class BaseMicroserviceResponse<T> {
  @Expose()
  @ApiPropertyOptional({ type: Object })
  meta?: any;

  data?: T;

  @Expose()
  @ApiPropertyOptional({ type: BaseApiErrorObject })
  error?: BaseApiErrorObject;
}

export class BaseApiClientResponse<T> {
  @Expose()
  @ApiPropertyOptional({ type: Number })
  code?: any;

  @Expose()
  @ApiPropertyOptional({ type: String })
  message?: string;

  @Expose()
  @ApiPropertyOptional({ type: Object })
  data?: T;

  @Expose()
  @ApiPropertyOptional({ type: Number })
  deviceCommandHistoryId?: number;
}

export function SwaggerBaseMicroserviceResponse<T>(
  type: T,
): typeof BaseMicroserviceResponse {
  class ExtendedBaseMicroserviceResponse<
    T,
  > extends BaseMicroserviceResponse<T> {
    @ApiPropertyOptional({ type })
    public data: T;
  }
  // NOTE : Overwrite the returned class name, otherwise whichever type calls this function in the last,
  // will overwrite all previous definitions. i.e., Swagger will have all response types as the same one.
  const isAnArray = Array.isArray(type) ? ' [ ] ' : '';
  Object.defineProperty(ExtendedBaseMicroserviceResponse, 'name', {
    value: `SwaggerBaseMicroserviceResponse ${type} ${isAnArray}`,
  });

  return ExtendedBaseMicroserviceResponse;
}
