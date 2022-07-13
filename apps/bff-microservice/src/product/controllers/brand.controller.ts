import { RoleGuard } from './../../../../../shared/guards/role.guard';
import { Roles } from './../../../../../shared/decorators/role.decorator';
import { JwtAuthGuard } from './../../../../../shared/guards/jwt-auth.guard';
import { BaseApiResponse } from './../../../../../shared/dtos/base-api-response.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ReqContext } from './../../../../../shared/request-context/req-context.decorator';
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
  Query,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { BrandInput } from '../dtos/brand-input.dto';
import { BrandOutput } from '../dtos/brand-output.dto';
import { BrandQuery } from '../dtos/brand-query.dto';
import { ROLE } from './../../../../../shared/constants/common';
@Controller('brands')
@ApiTags('products')
export class BrandController {
  constructor(
    private readonly logger: AppLogger,
    private readonly brandService: BrandService,
  ) {
    this.logger.setContext(BrandController.name);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.STAFF, ROLE.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async createBrand(
    @ReqContext() ctx: RequestContext,
    @Body() input: BrandInput,
  ): Promise<BaseApiResponse<BrandOutput>> {
    this.logger.log(ctx, `${this.createBrand.name} was called`);

    const data = await this.brandService.createBrand(ctx, input);

    return {
      data,
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

  @Get(':id')
  async getBrand(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<BrandOutput>> {
    this.logger.log(ctx, `${this.getBrand.name} was called`);

    const data = await this.brandService.getBrand(ctx, id);

    return { data };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.STAFF, ROLE.ADMIN)
  @HttpCode(HttpStatus.OK)
  async updateBrand(
    @ReqContext() ctx: RequestContext,
    @Body() input: any,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<BrandOutput>> {
    this.logger.log(ctx, `${this.updateBrand.name} was called`);

    const data = await this.brandService.updateBrand(ctx, input, id);
    return { data };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN)
  @HttpCode(HttpStatus.OK)
  async deleteBrand(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: string,
  ): Promise<BaseApiResponse<BrandOutput>> {
    this.logger.log(ctx, `${this.deleteBrand.name} was called`);

    const brand = await this.brandService.deleteBrand(ctx, id);

    return { data: brand };
  }
}
