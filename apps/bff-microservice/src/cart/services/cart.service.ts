import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { HttpRequestService } from './../../../../../shared/http-request/http-request.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CartOutput } from '../dtos/cart-output.dto';
import { CartItemInput } from '../dtos/item-input.dto';
import { CartItemOutput } from '../dtos/item-output.dto';

const pathCarts = 'v1/api/carts';

@Injectable()
export class CartService {
  private cartMicroserviceUrl: string;

  constructor(
    private readonly logger: AppLogger,
    private readonly httpService: HttpRequestService,
    private readonly configService: ConfigService,
  ) {
    this.logger.setContext(CartService.name);

    this.cartMicroserviceUrl =
      this.configService.get<string>('microservice.cart');
  }

  async createCart(ctx: RequestContext, userId: string): Promise<CartOutput> {
    this.logger.log(ctx, `${this.createCart.name} was called`);

    const apiUrl = `${this.cartMicroserviceUrl}/${pathCarts}`;
    this.logger.log(ctx, 'calling cart-microservice createCart');

    const response = await this.httpService.post<CartOutput>(ctx, apiUrl, {
      userId,
    });

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }

  async getCart(
    ctx: RequestContext,
    id: string,
  ): Promise<[CartOutput, number]> {
    this.logger.log(ctx, `${this.getCart.name} was called`);

    const apiUrl = `${this.cartMicroserviceUrl}/${pathCarts}/${id}`;
    this.logger.log(ctx, 'calling cart-microservice getCart');

    const response = await this.httpService.get<CartOutput>(ctx, apiUrl);

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return [response.data, response.meta.itemCount];
  }

  async createCartItem(
    ctx: RequestContext,
    cartId: string,
    input: CartItemInput,
  ): Promise<CartItemOutput> {
    this.logger.log(ctx, `${this.createCartItem.name} was called`);

    const apiUrl = `${this.cartMicroserviceUrl}/${pathCarts}/${cartId}/items`;
    this.logger.log(ctx, 'calling cart-microservice createCartItem');

    const response = await this.httpService.post<CartItemOutput>(
      ctx,
      apiUrl,
      input,
    );

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }

  async getCartItem(
    ctx: RequestContext,
    cartId: string,
    id: string,
  ): Promise<CartItemOutput> {
    this.logger.log(ctx, `${this.getCartItem.name} was called`);

    const apiUrl = `${this.cartMicroserviceUrl}/${pathCarts}/${cartId}/items/${id}`;
    this.logger.log(ctx, 'calling cart-microservice getCartItem');

    const response = await this.httpService.get<CartItemOutput>(ctx, apiUrl);

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }

  async updateCartItem(
    ctx: RequestContext,
    cartId: string,
    id: string,
    rawInput: any,
  ): Promise<CartItemOutput> {
    this.logger.log(ctx, `${this.updateCartItem.name} was called`);

    const apiUrl = `${this.cartMicroserviceUrl}/${pathCarts}/${cartId}/items/${id}`;
    this.logger.log(ctx, 'calling cart-microservice updateCartItem');

    const response = await this.httpService.put<CartItemOutput>(
      ctx,
      apiUrl,
      rawInput,
    );

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }

  async deleteCartItem(
    ctx: RequestContext,
    cartId: string,
    id: string,
  ): Promise<CartItemOutput> {
    this.logger.log(ctx, `${this.updateCartItem.name} was called`);

    const apiUrl = `${this.cartMicroserviceUrl}/${pathCarts}/${cartId}/items/${id}`;
    this.logger.log(ctx, 'calling cart-microservice deleteCartItem');

    const response = await this.httpService.delete<CartItemOutput>(ctx, apiUrl);

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }
}
