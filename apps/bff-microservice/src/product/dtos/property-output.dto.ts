import { IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
export class PropertyOutput {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiPropertyOptional()
  @Expose()
  deletedAt?: Date;

  @ApiProperty()
  @Expose()
  @IsArray()
  values: any[];
}
