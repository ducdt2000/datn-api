import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PublicFileOutput {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  url: string;

  @ApiProperty()
  @Expose()
  key: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiPropertyOptional()
  @Expose()
  deletedAt?: Date;
}
