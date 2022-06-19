import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PropertyInput } from './property-input.dto';

export class ItemLogInput {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  itemId: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  name: string;

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
  code: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @Expose()
  @Type(() => PropertyInput)
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested()
  properties: PropertyInput[];
}
