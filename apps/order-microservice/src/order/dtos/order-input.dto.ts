import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ItemInput } from './item-input.dto';

export class OrderInput {
  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  warehouseId?: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  paymentMethodId: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  deliveryMethodId: number;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  deliveryTime?: Date;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  bill: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  status: number;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  district: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  message?: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @Expose()
  @Type(() => ItemInput)
  @ValidateNested()
  @IsArray()
  @IsObject({ each: true })
  items: ItemInput[];
}
