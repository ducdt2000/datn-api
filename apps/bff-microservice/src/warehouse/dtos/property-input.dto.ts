import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class WarehousePropertyInput {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  value: string;
}
