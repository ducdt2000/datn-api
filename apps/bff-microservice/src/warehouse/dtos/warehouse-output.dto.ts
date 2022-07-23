import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserOutput } from '../../user/dtos/user-output.dto';
import { WarehouseItemOutput } from './item-output.dto';
import { WarehouseLogOutput } from './warehouse-log-output.dto';

export class WarehouseOutput {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  managerUserId: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  address: string;

  @ApiProperty()
  @Expose()
  city: string;

  @ApiProperty()
  @Expose()
  district: string;

  @ApiProperty()
  @Expose()
  status: number;

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
  @Type(() => WarehouseItemOutput)
  items: WarehouseItemOutput[];

  @ApiProperty()
  @Expose()
  @Type(() => WarehouseLogOutput)
  warehouseLogs: WarehouseLogOutput[];

  @ApiProperty()
  @Expose()
  @Type(() => UserOutput)
  manager: UserOutput;
}
