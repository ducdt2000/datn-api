import { BaseApiResponse } from './../../../../../shared/dtos/base-api-response.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ProductTypeInput } from './../dtos/product-type-input.dto';
import { ReqContext } from './../../../../../shared/request-context/req-context.decorator';
import { ProductTypeService } from './../services/product-type.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductTypeOutput } from '../dtos/product-type-output.dto';

@ApiTags('product-types')
@Controller('product-types')
export class ProductTypeController {
  constructor(
    private readonly logger: AppLogger,
    private readonly productTypeService: ProductTypeService,
  ) {
    this.logger.setContext(ProductTypeController.name);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProductType(
    @ReqContext() ctx: RequestContext,
    @Body() input: ProductTypeInput,
  ): Promise<BaseApiResponse<ProductTypeOutput>> {
    this.logger.log(ctx, `${this.createProductType.name} was called`);

    const data = await this.productTypeService.createProductType(ctx, input);

    return {
      data,
      meta: {},
    };
  }

  @Get()
  async getProductTypes(
    @ReqContext() ctx: RequestContext,
  ): Promise<BaseApiResponse<ProductTypeOutput[]>> {
    this.logger.log(ctx, `${this.getProductTypes.name} was called`);

    const [data, count] = await this.productTypeService.getProductTypes(ctx);

    return {
      data,
      meta: { count },
    };
  }

  @Put(':id')
  async updateProductType(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
    @Body() input: ProductTypeInput,
  ) {
    this.logger.log(ctx, `${this.updateProductType.name} was called`);

    const data = await this.productTypeService.updateProductType(
      ctx,
      input,
      id,
    );
    return {
      data,
      meta: { count: 1 },
    };
  }

  @Delete(':id')
  async deleteProductType(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
  ) {
    this.logger.log(ctx, `${this.deleteProductType.name} was called`);

    const data = await this.productTypeService.deleteProductType(ctx, id);

    return { data, meta: { count: 1 } };
  }
}
