import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserOutput } from './user-output.dto';
export class TokenDetailOutput extends UserOutput {
  @Expose()
  @ApiPropertyOptional()
  exp?: number;
}
