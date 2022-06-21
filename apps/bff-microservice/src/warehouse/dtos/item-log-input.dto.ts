import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { WarehousePropertyInput } from './property-input.dto';

export class WarehouseItemLogInput {
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
  @Type(() => WarehousePropertyInput)
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested()
  properties: WarehousePropertyInput[];
}
