import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CustomProductInput {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  productTemplateId: number;

  @ApiProperty()
  @Expose()
  @IsOptional()
  properties: any[];

  @ApiProperty()
  @Expose()
  @IsOptional()
  message?: string;
}
