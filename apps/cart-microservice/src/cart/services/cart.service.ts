import { CartOutput } from './../dtos/cart-output.dto';
import { plainToInstance } from 'class-transformer';
import { Cart } from './../entities/cart.entity';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ItemRepository } from './../repositories/item.repository';
import { CartRepository } from './../repositories/cart.repository';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PropertyRepository } from '../repositories/property.repository';
import { CartInput } from '../dtos/cart-input.dto';
import { ItemOutput } from '../dtos/item-output.dto';
import { ItemInput } from '../dtos/item-input.dto';
import { validate } from 'class-validator';
import { getConnection } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    private readonly logger: AppLogger,
    private readonly cartRepository: CartRepository,
    private readonly itemRepository: ItemRepository,
    private readonly propertyRepository: PropertyRepository,
  ) {
    this.logger.setContext(CartService.name);
  }

  async createCart(ctx: RequestContext, input: CartInput): Promise<CartOutput> {
    this.logger.log(ctx, `${this.createCart.name} was called`);

    const cart = new Cart();
    cart.id = input.userId;

    const savedCart = await this.cartRepository.save(cart);

    return plainToInstance(CartOutput, savedCart, {
      excludeExtraneousValues: true,
    });
  }

  async getCart(ctx: RequestContext, id: string): Promise<CartOutput> {
    this.logger.log(ctx, `${this.getCart.name} was called`);

    const cart = await this.cartRepository.getDetail(id);

    return plainToInstance(CartOutput, cart, { excludeExtraneousValues: true });
  }

  async createCartItem(
    ctx: RequestContext,
    cartId: string,
    input: ItemInput,
  ): Promise<ItemOutput> {
    this.logger.log(ctx, `${this.createCartItem.name} was called`);

    await this.cartRepository.getDetail(cartId);

    const newItem = this.itemRepository.create({ ...input, cartId });

    let savedItem: any;

    await getConnection().transaction(async (trans) => {
      savedItem = await trans.save(newItem);
    });

    return plainToInstance(ItemOutput, savedItem, {
      excludeExtraneousValues: true,
    });
  }

  async getCartItem(
    ctx: RequestContext,
    cartId: string,
    id: string,
  ): Promise<ItemOutput> {
    this.logger.log(ctx, `${this.getCartItem.name} was called`);

    const item = await this.itemRepository.getDetail(cartId, id);

    return plainToInstance(ItemOutput, item, { excludeExtraneousValues: true });
  }

  async updateCartItem(
    ctx: RequestContext,
    cartId: string,
    id: string,
    rawInput: any,
  ): Promise<ItemOutput> {
    this.logger.log(ctx, `${this.updateCartItem.name} was called`);

    const item = await this.itemRepository.getDetail(cartId, id);

    const input = plainToInstance(ItemInput, rawInput, {
      excludeExtraneousValues: true,
    });

    const error = await validate(input, { skipUndefinedProperties: true });
    if (error.length) {
      throw new BadRequestException(error);
    }

    input.properties = undefined;
    this.itemRepository.merge(item, input);

    const savedItem = await this.itemRepository.save(item);

    return plainToInstance(ItemOutput, savedItem, {
      excludeExtraneousValues: true,
    });
  }

  async deleteCartItem(
    ctx: RequestContext,
    cartId: string,
    id: string,
  ): Promise<ItemOutput> {
    this.logger.log(ctx, `${this.updateCartItem.name} was called`);

    await this.itemRepository.getDetail(cartId, id);

    const savedItem = await this.itemRepository.softDelete(id);
    return plainToInstance(ItemOutput, savedItem, {
      excludeExtraneousValues: true,
    });
  }
}
