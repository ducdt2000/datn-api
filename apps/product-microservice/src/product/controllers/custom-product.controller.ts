import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ReqContext } from 'shared/request-context/req-context.decorator';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomProductService } from '../services/custom-product.service';
import { CustomProductInput } from '../dtos/custom-product-input.dto';

@Controller('custom-products')
@ApiTags('custom-products')
export class CustomProductController {
  constructor(private readonly customProductService: CustomProductService) {}

  @Get('templates')
  async getTemplates(@ReqContext() ctx: RequestContext) {
    return await this.customProductService.getCustomTemplates(ctx);
  }

  @Get('templates/:id')
  async getTemplate(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number,
  ) {
    const template = await this.customProductService.getCustomTemplate(ctx, id);
    return template;
  }

  @Post()
  async createCustomProduct(
    @ReqContext() ctx: RequestContext,
    @Body() input: CustomProductInput,
  ) {
    return this.customProductService.createCustomProduct(ctx, input);
  }
}
