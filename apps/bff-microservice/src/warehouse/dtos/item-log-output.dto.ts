import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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
}
