import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { DeliveryMethodOutput } from '../../order-method/dtos/delivery-method-output.dto';
import { PaymentMethodOutput } from '../../order-method/dtos/payment-method-output.dto';
import { ItemOutput } from './item-output.dto';
import { OrderLogOutput } from './order-log-output.dto';

export class OrderOutput {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  warehouseId: string;

  @ApiProperty()
  @Expose()
  paymentMethodId: string;

  @ApiProperty()
  @Expose()
  deliveryMethodId: string;

  @ApiProperty()
  @Expose()
  deliveryTime: string;

  @ApiProperty()
  @Expose()
  bill: number;

  @ApiProperty()
  @Expose()
  status: number;

  @ApiProperty()
  @Expose()
  address: string;

  @ApiProperty()
  @Expose()
  district: string;

  @ApiProperty()
  @Expose()
  city: string;

  @ApiProperty()
  @Expose()
  trackingNumber: number;

  @ApiPropertyOptional()
  @Expose()
  message?: string;

  @ApiProperty()
  @Expose()
  phone: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiPropertyOptional()
  @Expose()
  deletedAt?: Date;

  @ApiProperty()
  @Expose()
  @Type(() => ItemOutput)
  items: ItemOutput[];

  @ApiProperty()
  @Expose()
  @Type(() => OrderLogOutput)
  orderLogs: OrderLogOutput[];

  @ApiProperty()
  @Expose()
  @Type(() => PaymentMethodOutput)
  paymentMethod: PaymentMethodOutput;

  @ApiProperty()
  @Expose()
  @Type(() => DeliveryMethodOutput)
  deliveryMethod: DeliveryMethodOutput;
}
