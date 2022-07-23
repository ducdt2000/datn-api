import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { WarehouseItemOutput } from './item-output.dto';

export class WarehouseItemLogOutput {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  warehouseLogId: string;

  @ApiProperty()
  @Expose()
  itemId: string;

  @ApiProperty()
  @Expose()
  amount: number;

  @ApiProperty()
  @Expose()
  @Type(() => WarehouseItemOutput)
  item: WarehouseItemOutput;
}
