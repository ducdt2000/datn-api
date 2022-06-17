import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { CartService } from './../services/cart.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReqContext } from './../../../../../shared/request-context/req-context.decorator';
import { BaseApiResponse } from './../../../../../shared/dtos/base-api-response.dto';
import { CartOutput } from '../dtos/cart-output.dto';
import { CartInput } from '../dtos/cart-input.dto';

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
}
