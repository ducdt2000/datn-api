import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { CartService } from './../services/cart.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReqContext } from './../../../../../shared/request-context/req-context.decorator';
import { BaseApiResponse } from './../../../../../shared/dtos/base-api-response.dto';
import { CartOutput } from '../dtos/cart-output.dto';
import { CartInput } from '../dtos/cart-input.dto';
import { ItemOutput } from '../dtos/item-output.dto';
import { ItemInput } from '../dtos/item-input.dto';

@ApiTags('carts')
@Controller('carts')
export class CartController {
  constructor(
    private readonly logger: AppLogger,
    private readonly cartService: CartService,
  ) {
    this.logger.setContext(CartController.name);
  }

  @Post()
  async createCart(
    @ReqContext() ctx: RequestContext,
    @Body() input: CartInput,
  ): Promise<BaseApiResponse<CartOutput>> {
    this.logger.log(ctx, `${this.createCart.name} was called`);

    const data = await this.cartService.createCart(ctx, input);

    return { data };
  }

  @Get(':id')
  async getCart(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<CartOutput>> {
    this.logger.log(ctx, `${this.getCart.name} was called`);

    const data = await this.cartService.getCart(ctx, id);

    return { data, meta: { itemCount: data.items.length } };
  }

  @Post(':id/items')
  async createCartItem(
    @ReqContext() ctx: RequestContext,
    @Param('cartId') cartId: string,
    @Body() input: ItemInput,
  ): Promise<BaseApiResponse<ItemOutput>> {
    this.logger.log(ctx, `${this.createCartItem.name} was called`);

    const data = await this.cartService.createCartItem(ctx, cartId, input);

    return { data };
  }

  @Get(':cartId/items/:id')
  async getCartItem(
    @ReqContext() ctx: RequestContext,
    @Param('cartId') cartId: string,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<ItemOutput>> {
    this.logger.log(ctx, `${this.getCartItem.name} was called`);

    const data = await this.cartService.getCartItem(ctx, cartId, id);

    return { data };
  }

  @Put(':cartId/items/:id')
  async updateCartItem(
    @ReqContext() ctx: RequestContext,
    @Param('cartId') cartId: string,
    @Param('id') id: string,
    @Body() rawInput: any,
  ): Promise<BaseApiResponse<ItemOutput>> {
    this.logger.log(ctx, `${this.updateCartItem.name} was called`);

    const data = await this.cartService.updateCartItem(
      ctx,
      cartId,
      id,
      rawInput,
    );

    return { data };
  }

  @Delete(':cartId/items/:id')
  async deleteCartItem(
    @ReqContext() ctx: RequestContext,
    @Param('cartId') cartId: string,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<ItemOutput>> {
    this.logger.log(ctx, `${this.deleteCartItem.name} was called`);

    const data = await this.cartService.deleteCartItem(ctx, cartId, id);

    return { data };
  }
}
