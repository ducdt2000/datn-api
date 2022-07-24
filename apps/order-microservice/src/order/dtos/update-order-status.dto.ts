import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateOrderStatus {
  @ApiProperty()
  @Expose()
  @IsOptional()
  warehouseId?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  address: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  city: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  district: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  status: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  userName?: string;
}
