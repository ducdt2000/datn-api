import {
  ErrCategoryCode,
  ErrDetailCode,
  ErrMicroserviceCode,
} from './../../../../../shared/constants/errors';
import { RoleGuard } from './../../../../../shared/guards/role.guard';
import { BaseApiResponse } from './../../../../../shared/dtos/base-api-response.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ReqContext } from './../../../../../shared/request-context/req-context.decorator';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from '../services/cart.service';
import { CartOutput } from '../dtos/cart-output.dto';
import { JwtAuthGuard } from './../../../../../shared/guards/jwt-auth.guard';
import { Roles } from './../../../../../shared/decorators/role.decorator';
import { ROLE } from './../../../../../shared/constants/common';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { ItemInput } from '../dtos/item-input.dto';
import { ItemOutput } from '../dtos/item-output.dto';

@ApiTags('carts')
@Controller('carts')
export class CartController {
  constructor(
    private readonly logger: AppLogger,
    private readonly cartService: CartService,
  ) {
    this.logger.setContext(CartController.name);
  }

  @Get(':cartId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.USER, ROLE.ADMIN, ROLE.STAFF)
  async getCart(
    @ReqContext() ctx: RequestContext,
    @Param('cartId') cartId: string,
  ): Promise<BaseApiResponse<CartOutput>> {
    this.logger.log(ctx, `${this.getCart.name} was called`);

    if (ctx.user.role === ROLE.USER && ctx.user.id !== cartId) {
      throw new ForbiddenException(
        new DetailErrorCode(
          ErrCategoryCode.FORBIDDEN,
          ErrMicroserviceCode.CART,
          ErrDetailCode.CART,
          "You don't have permission",
        ),
      );
    }

    const [data, itemCount] = await this.cartService.getCart(ctx, cartId);

    return { data, meta: { itemCount } };
  }

  @Post(':cartId/items')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.USER)
  async createCartItem(
    @ReqContext() ctx: RequestContext,
    @Param('cartId') cartId: string,
    @Body() input: ItemInput,
  ): Promise<BaseApiResponse<ItemOutput>> {
    this.logger.log(ctx, `${this.createCartItem.name} was called`);

    if (ctx.user.id !== cartId) {
      throw new ForbiddenException(
        new DetailErrorCode(
          ErrCategoryCode.FORBIDDEN,
          ErrMicroserviceCode.CART,
          ErrDetailCode.CART,
          "You don't have permission",
        ),
      );
    }

    const data = await this.cartService.createCartItem(ctx, cartId, input);

    return { data };
  }

  @Get(':cartId/items/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.USER, ROLE.ADMIN, ROLE.STAFF)
  async getCartItem(
    @ReqContext() ctx: RequestContext,
    @Param('cartId') cartId: string,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<ItemOutput>> {
    this.logger.log(ctx, `${this.getCartItem.name} was called`);

    if (ctx.user.role === ROLE.USER && ctx.user.id !== id) {
      throw new ForbiddenException(
        new DetailErrorCode(
          ErrCategoryCode.FORBIDDEN,
          ErrMicroserviceCode.CART,
          ErrDetailCode.CART,
          "You don't have permission",
        ),
      );
    }

    const data = await this.cartService.getCartItem(ctx, cartId, id);

    return { data };
  }

  @Put(':cartId/items/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.USER)
  async updateCartItem(
    @ReqContext() ctx: RequestContext,
    @Param('cartId') cartId: string,
    @Param('id') id: string,
    @Body() rawInput: any,
  ): Promise<BaseApiResponse<ItemOutput>> {
    this.logger.log(ctx, `${this.updateCartItem.name} was called`);

    if (ctx.user.id !== cartId) {
      throw new ForbiddenException(
        new DetailErrorCode(
          ErrCategoryCode.FORBIDDEN,
          ErrMicroserviceCode.CART,
          ErrDetailCode.CART,
          "You don't have permission",
        ),
      );
    }

    const data = await this.cartService.updateCartItem(
      ctx,
      cartId,
      id,
      rawInput,
    );

    return { data };
  }

  @Delete(':cartId/items/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.USER)
  async deleteCartItem(
    @ReqContext() ctx: RequestContext,
    @Param('cartId') cartId: string,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<ItemOutput>> {
    this.logger.log(ctx, `${this.deleteCartItem.name} was called`);

    if (ctx.user.id !== cartId) {
      throw new ForbiddenException(
        new DetailErrorCode(
          ErrCategoryCode.FORBIDDEN,
          ErrMicroserviceCode.CART,
          ErrDetailCode.CART,
          "You don't have permission",
        ),
      );
    }

    const data = await this.cartService.deleteCartItem(ctx, cartId, id);

    return { data };
  }
}
