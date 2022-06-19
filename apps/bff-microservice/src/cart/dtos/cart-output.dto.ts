import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CartItemOutput } from './item-output.dto';

export class CartOutput {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  items: CartItemOutput[];

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @ApiPropertyOptional()
  deletedAt?: Date;
}
