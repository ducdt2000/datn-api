import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { WarehousePropertyOutput } from './property-output.dto';

export class WarehouseItemOutput {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  productId: string;

  @ApiProperty()
  @Expose()
  warehouseId: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  price: number;

  @ApiProperty()
  @Expose()
  description?: string;

  @ApiProperty()
  @Expose()
  code: string;

  @ApiProperty()
  @Expose()
  amount: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  deletedAt?: Date;

  @ApiProperty()
  @Expose()
  @Type(() => WarehousePropertyOutput)
  properties: WarehousePropertyOutput[];
}
