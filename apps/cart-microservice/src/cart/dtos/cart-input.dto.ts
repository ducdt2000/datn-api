import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CartInput {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  userId: string;
}
