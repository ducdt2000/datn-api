import { TokenDetailOutput } from './token-detail-output.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class UserTokenOutput {
  @Expose()
  @ApiProperty()
  token: string;

  @Expose()
  @ApiPropertyOptional({ type: TokenDetailOutput })
  @Type(() => TokenDetailOutput)
  detail?: TokenDetailOutput;
}
