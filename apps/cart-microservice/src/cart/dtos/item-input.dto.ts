import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { PropertyInput } from './property-input.dto';

export class ItemInput {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  price: number;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @Min(0)
  amount: number;

  @ApiProperty()
  @Expose()
  @Type(() => PropertyInput)
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested()
  properties: PropertyInput[];
}
