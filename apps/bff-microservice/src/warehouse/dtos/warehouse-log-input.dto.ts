import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { WarehouseItemLogInput } from './item-log-input.dto';

export class WarehouseLogInput {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @Expose()
  @Type(() => WarehouseItemLogInput)
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested()
  itemLogs: WarehouseItemLogInput[];
}
