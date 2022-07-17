import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ItemOutput } from './item-output.dto';

export class ItemLogOutput {
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
  @Type(() => ItemOutput)
  item: ItemOutput;
}
