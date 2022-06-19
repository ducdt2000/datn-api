import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class WarehouseInput {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  managerUserId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  name: string;

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
}
