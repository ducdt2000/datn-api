import { RoleGuard } from './../../../../../shared/guards/role.guard';
import { JwtAuthGuard } from './../../../../../shared/guards/jwt-auth.guard';
import { BaseApiResponse } from '../../../../../shared/dtos/base-api-response.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ReqContext } from '../../../../../shared/request-context/req-context.decorator';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WarehouseService } from '../services/warehouse.service';
import { WarehouseInput } from '../dtos/warehouse-input.dto';
import { WarehouseOutput } from '../dtos/warehouse-output.dto';
import { WarehouseQuery } from '../dtos/warehouse-query.dto';
import { ChangeStatusInput } from '../dtos/change-status-input.dto';
import { WarehouseLogInput } from '../dtos/warehouse-log-input.dto';
import { WarehouseLogOutput } from '../dtos/warehouse-log-output.dto';
import { WarehouseLogQuery } from '../dtos/warehouse-log-query.dto';
import { Roles } from 'shared/decorators/role.decorator';
import { ROLE } from 'shared/constants/common';
import { WarehouseItemInput } from '../dtos/item-input.dto';
import { WarehouseItemOutput } from '../dtos/item-output.dto';

@Controller('warehouses')
@ApiTags('warehouses')
export class WarehouseController {
  constructor(
    private readonly logger: AppLogger,
    private readonly warehouseService: WarehouseService,
  ) {
    this.logger.setContext(WarehouseController.name);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN)
  async createWarehouse(
    @ReqContext() ctx: RequestContext,
    @Body() input: WarehouseInput,
  ): Promise<BaseApiResponse<WarehouseOutput>> {
    this.logger.log(ctx, `${this.createWarehouse.name} was called`);

    const data = await this.warehouseService.createWarehouse(ctx, input);

    return { data };
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN, ROLE.STAFF)
  async getWarehouses(
    @ReqContext() ctx: RequestContext,
    @Query() query: WarehouseQuery,
  ): Promise<BaseApiResponse<WarehouseOutput[]>> {
    this.logger.log(ctx, `${this.getWarehouses.name} was called`);

    const [data, count] = await this.warehouseService.getWarehouses(ctx, query);

    return { data, meta: { count } };
  }

  @Get(':warehouseId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN, ROLE.STAFF)
  async getWarehouse(
    @ReqContext() ctx: RequestContext,
    @Param('warehouseId') id: string,
  ): Promise<BaseApiResponse<WarehouseOutput>> {
    this.logger.log(ctx, `${this.getWarehouse.name} was called`);

    const data = await this.warehouseService.getWarehouse(ctx, id);

    return { data };
  }

  @Put(':warehouseId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN, ROLE.STAFF)
  async updateWarehouse(
    @ReqContext() ctx: RequestContext,
    @Param('warehouseId') warehouseId: string,
    @Body() rawInput: any,
  ): Promise<BaseApiResponse<WarehouseOutput>> {
    this.logger.log(ctx, `${this.updateWarehouse.name} was called`);

    const data = await this.warehouseService.updateWarehouse(
      ctx,
      warehouseId,
      rawInput,
    );

    return { data };
  }

  @Put(':warehouseId/status')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN)
  async changeStatus(
    @ReqContext() ctx: RequestContext,
    @Param('warehouseId') warehouseId: string,
    @Body() input: ChangeStatusInput,
  ): Promise<BaseApiResponse<WarehouseOutput>> {
    this.logger.log(ctx, `${this.changeStatus.name} was called`);

    const data = await this.warehouseService.changeStatus(
      ctx,
      warehouseId,
      input,
    );

    return { data };
  }

  @Post(':warehouseId/import')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN, ROLE.STAFF)
  async import(
    @ReqContext() ctx: RequestContext,
    @Param('warehouseId') warehouseId: string,
    @Body() logInput: WarehouseLogInput,
  ): Promise<BaseApiResponse<WarehouseLogOutput>> {
    this.logger.log(ctx, `${this.import.name} was called`);

    const data = await this.warehouseService.import(ctx, warehouseId, logInput);

    return { data };
  }

  @Post(':warehouseId/export')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN, ROLE.STAFF)
  async export(
    @ReqContext() ctx: RequestContext,
    @Param('warehouseId') warehouseId: string,
    @Body() logInput: WarehouseLogInput,
  ): Promise<BaseApiResponse<WarehouseLogOutput>> {
    this.logger.log(ctx, `${this.export.name} was called`);

    const data = await this.warehouseService.export(ctx, warehouseId, logInput);

    return { data };
  }

  @Get(':warehouseId/logs/:logId')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN, ROLE.STAFF)
  async getLog(
    @ReqContext() ctx: RequestContext,
    @Param('warehouseId') warehouseId: string,
    @Param('logId') logId: string,
  ): Promise<BaseApiResponse<WarehouseLogOutput>> {
    this.logger.log(ctx, `${this.getLog.name} was called`);

    const data = await this.warehouseService.getLog(ctx, warehouseId, logId);

    return { data };
  }

  @Get(':warehouseId/logs')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN, ROLE.STAFF)
  async getLogs(
    @ReqContext() ctx: RequestContext,
    @Param('warehouseId') warehouseId: string,
    @Query() query: WarehouseLogQuery,
  ): Promise<BaseApiResponse<WarehouseLogOutput[]>> {
    this.logger.log(ctx, `${this.getLogs.name} was called`);

    const [data, count] = await this.warehouseService.getLogs(
      ctx,
      warehouseId,
      query,
    );

    return { data, meta: { count } };
  }

  @Post(':warehouseId/items')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ROLE.ADMIN, ROLE.STAFF)
  async createItem(
    @ReqContext() ctx: RequestContext,
    @Param('warehouseId') warehouseId: string,
    @Body() input: WarehouseItemInput,
  ): Promise<BaseApiResponse<WarehouseItemOutput>> {
    this.logger.log(ctx, `${this.createItem.name} was called`);

    const data = await this.warehouseService.createWarehouseItem(
      ctx,
      warehouseId,
      input,
    );

    return { data };
  }
}
