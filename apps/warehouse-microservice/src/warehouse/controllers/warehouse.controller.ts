import { WarehouseLogQuery } from './../dtos/warehouse-log-query.dto';
import { BaseApiResponse } from 'shared/dtos/base-api-response.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WarehouseLogService } from '../services/warehouse-log.service';
import { WarehouseService } from '../services/warehouse.service';
import { ReqContext } from 'shared/request-context/req-context.decorator';
import { WarehouseOutput } from '../dtos/warehouse-output.dto';
import { WarehouseInput } from '../dtos/warehouse-input.dto';
import { WarehouseQuery } from '../dtos/warehouse-query.dto';
import { ChangeStatusInput } from '../dtos/change-status-input.dto';
import { WarehouseLogOutput } from '../dtos/warehouse-log-output.dto';
import { WAREHOUSE_LOG_TYPE } from 'shared/constants/common';
import { WarehouseLogInput } from '../dtos/warehouse-log-input.dto';
import { ItemInput } from '../dtos/item-input.dto';
import { ItemOutput } from '../dtos/item-output.dto';

@Controller('warehouses')
@ApiTags('warehouses')
export class WarehouseController {
  constructor(
    private readonly logger: AppLogger,
    private readonly warehouseService: WarehouseService,
    private readonly warehouseLogService: WarehouseLogService,
  ) {
    this.logger.setContext(WarehouseController.name);
  }

  @Post()
  async createWarehouse(
    @ReqContext() ctx: RequestContext,
    @Body() input: WarehouseInput,
  ): Promise<BaseApiResponse<WarehouseOutput>> {
    this.logger.log(ctx, `${this.createWarehouse.name} was called`);

    const data = await this.warehouseService.createWarehouse(ctx, input);

    return { data };
  }

  @Get()
  async getWarehouses(
    @ReqContext() ctx: RequestContext,
    @Query() query: WarehouseQuery,
  ): Promise<BaseApiResponse<WarehouseOutput[]>> {
    this.logger.log(ctx, `${this.getWarehouses.name} was called`);

    const [data, count] = await this.warehouseService.getWarehouses(ctx, query);

    return { data, meta: { count } };
  }

  @Get(':warehouseId')
  async getWarehouse(
    @ReqContext() ctx: RequestContext,
    @Param('warehouseId') id: string,
  ): Promise<BaseApiResponse<WarehouseOutput>> {
    this.logger.log(ctx, `${this.getWarehouse.name} was called`);

    const data = await this.warehouseService.getWarehouse(ctx, id);

    return { data };
  }

  @Put(':warehouseId')
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
  async import(
    @ReqContext() ctx: RequestContext,
    @Param('warehouseId') warehouseId: string,
    @Body() logInput: WarehouseLogInput,
  ): Promise<BaseApiResponse<WarehouseLogOutput>> {
    this.logger.log(ctx, `${this.import.name} was called`);

    const data = await this.warehouseService.createLog(
      ctx,
      warehouseId,
      logInput,
      WAREHOUSE_LOG_TYPE.IMPORT,
    );

    return { data };
  }

  @Post(':warehouseId/export')
  async export(
    @ReqContext() ctx: RequestContext,
    @Param('warehouseId') warehouseId: string,
    @Body() logInput: WarehouseLogInput,
  ): Promise<BaseApiResponse<WarehouseLogOutput>> {
    this.logger.log(ctx, `${this.export.name} was called`);

    const data = await this.warehouseService.createLog(
      ctx,
      warehouseId,
      logInput,
      WAREHOUSE_LOG_TYPE.EXPORT,
    );

    return { data };
  }

  @Get(':warehouseId/logs/:logId')
  async getLog(
    @ReqContext() ctx: RequestContext,
    @Param('warehouseId') warehouseId: string,
    @Param('logId') logId: string,
  ): Promise<BaseApiResponse<WarehouseLogOutput>> {
    this.logger.log(ctx, `${this.getLog.name} was called`);

    const data = await this.warehouseLogService.getLog(ctx, warehouseId, logId);

    return { data };
  }

  @Get(':warehouseId/logs')
  async getLogs(
    @ReqContext() ctx: RequestContext,
    @Param('warehouseId') warehouseId: string,
    @Query() query: WarehouseLogQuery,
  ): Promise<BaseApiResponse<WarehouseLogOutput[]>> {
    this.logger.log(ctx, `${this.getLogs.name} was called`);

    const [data, count] = await this.warehouseLogService.getLogs(
      ctx,
      warehouseId,
      query,
    );

    return { data, meta: { count } };
  }

  @Post(':warehouseId/items')
  async createItem(
    @ReqContext() ctx: RequestContext,
    @Param('warehouseId') warehouseId: string,
    @Body() input: ItemInput,
  ): Promise<BaseApiResponse<ItemOutput>> {
    this.logger.log(ctx, `${this.createItem.name} was called`);

    const data = await this.warehouseService.createWarehouseItem(
      ctx,
      warehouseId,
      input,
    );

    return { data };
  }
}
