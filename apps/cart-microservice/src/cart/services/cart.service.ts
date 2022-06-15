import { CartOutput } from './../dtos/cart-output.dto';
import { plainToInstance } from 'class-transformer';
import { Cart } from './../entities/cart.entity';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ItemRepository } from './../repositories/item.repository';
import { CartRepository } from './../repositories/cart.repository';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { PropertyRepository } from '../repositories/property.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly logger: AppLogger,
    private readonly cartRepository: CartRepository,
    itemRepository: ItemRepository,
    propertyRepository: PropertyRepository,
  ) {
    this.logger.setContext(CartService.name);
  }

  async createCart(ctx: RequestContext): Promise<CartOutput> {
    const cart = new Cart();
    cart.userId = ctx.user.id;

    const savedCart = await this.cartRepository.save(cart);

    return plainToInstance(CartOutput, savedCart, {
      excludeExtraneousValues: true,
    });
  }
}
