import { ORDER_STATUS } from './../../../../../shared/constants/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';

export class UpdateOrderStatus {
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
  @IsEnum(ORDER_STATUS)
  status: number;
}
