import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CartPropertyOutput } from './property-output.dto';

export class CartItemOutput {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  cartId: string;

  @Expose()
  @ApiProperty()
  productId: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  code: string;

  @Expose()
  @ApiProperty()
  price: string;

  @Expose()
  @ApiProperty()
  description?: string;

  @Expose()
  @ApiProperty()
  amount: string;

  @Expose()
  @ApiProperty()
  properties: CartPropertyOutput[];

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
