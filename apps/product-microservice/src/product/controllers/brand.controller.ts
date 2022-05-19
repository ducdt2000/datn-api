import { BrandQuery } from '../dtos/brand-query.dto';
import { BrandOutput } from '../dtos/brand-output.dto';
import { BaseApiResponse } from '../../../../../shared/dtos/base-api-response.dto';
import { BrandInput } from '../dtos/brand-input.dto';
import { RequestContext } from '../../../../../shared/request-context/request-context.dto';
import { ReqContext } from '../../../../../shared/request-context/req-context.decorator';
import { BrandService } from '../services/brand.service';
import { AppLogger } from '../../../../../shared/logger/logger.service';
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
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('brands')
@ApiTags('brands')
export class BrandController {
  constructor(
    private readonly logger: AppLogger,
    private readonly brandService: BrandService,
  ) {
    this.logger.setContext(BrandController.name);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBrand(
    @ReqContext() ctx: RequestContext,
    @Body() input: BrandInput,
  ): Promise<BaseApiResponse<BrandOutput>> {
    this.logger.log(ctx, `${this.createBrand.name} was called`);

    const data = await this.brandService.createBrand(ctx, input);

    return {
      data,
      meta: {},
    };
  }

  @Get()
  async getBrands(
    @ReqContext() ctx: RequestContext,
    @Query() query: BrandQuery,
  ): Promise<BaseApiResponse<BrandOutput[]>> {
    this.logger.log(ctx, `${this.getBrands.name} was called`);

    const [brands, count] = await this.brandService.getBrands(ctx, query);

    return {
      data: brands,
      meta: { count },
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateBrand(
    @ReqContext() ctx: RequestContext,
    @Body() input: BrandInput,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<BrandOutput>> {
    this.logger.log(ctx, `${this.updateBrand.name} was called`);

    const brand = await this.brandService.updateBrand(ctx, input, id);
    return {
      data: brand,
      meta: {
        count: 1,
      },
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteBrand(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<BrandOutput>> {
    this.logger.log(ctx, `${this.deleteBrand.name} was called`);

    const brand = await this.brandService.deleteBrand(ctx, id);

    return {
      data: brand,
      meta: { count: 1 },
    };
  }
}
