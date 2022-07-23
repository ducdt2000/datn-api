import { ROLE } from './../../../../../shared/constants/common';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { HttpRequestService } from 'shared/http-request/http-request.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WarehouseInput } from '../dtos/warehouse-input.dto';
import { WarehouseOutput } from '../dtos/warehouse-output.dto';
import { WarehouseQuery } from '../dtos/warehouse-query.dto';
import { ChangeStatusInput } from '../dtos/change-status-input.dto';
import { WarehouseLogInput } from '../dtos/warehouse-log-input.dto';
import { WarehouseLogOutput } from '../dtos/warehouse-log-output.dto';
import { WarehouseLogQuery } from '../dtos/warehouse-log-query.dto';
import { UserService } from '../../user/services/user.service';
import { UserOutput } from '../../user/dtos/user-output.dto';
import { WarehouseItemInput } from '../dtos/item-input.dto';
import { WarehouseItemOutput } from '../dtos/item-output.dto';

const pathWarehouses = 'v1/api/warehouses';

@Injectable()
export class WarehouseService {
  private readonly warehouseMicroserviceUrl: string;

  constructor(
    private readonly logger: AppLogger,
    private readonly httpService: HttpRequestService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.logger.setContext(WarehouseService.name);

    this.warehouseMicroserviceUrl = this.configService.get<string>(
      'microservice.warehouse',
    );
  }

  async createWarehouse(
    ctx: RequestContext,
    input: WarehouseInput,
  ): Promise<WarehouseOutput> {
    this.logger.log(ctx, `${this.createWarehouse.name} was called`);

    const apiUrl = `${this.warehouseMicroserviceUrl}/${pathWarehouses}`;
    this.logger.log(ctx, 'calling warehouse-microservice createWarehouse');

    const response = await this.httpService.post<WarehouseOutput>(
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

  async getWarehouse(
    ctx: RequestContext,
    warehouseId: string,
  ): Promise<WarehouseOutput> {
    this.logger.log(ctx, `${this.createWarehouse.name} was called`);

    const apiUrl = `${this.warehouseMicroserviceUrl}/${pathWarehouses}/${warehouseId}`;
    this.logger.log(ctx, 'calling warehouse-microservice getWarehouse');

    const response = await this.httpService.get<WarehouseOutput>(ctx, apiUrl);

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    const managers = await this.userService.getManagers(
      ctx,
      response.data.managerUserId,
    );

    response.data.manager = managers[0];

    return response.data;
  }

  async getWarehouses(
    ctx: RequestContext,
    query: WarehouseQuery,
  ): Promise<[WarehouseOutput[], number]> {
    this.logger.log(ctx, `${this.createWarehouse.name} was called`);

    const apiUrl = `${this.warehouseMicroserviceUrl}/${pathWarehouses}`;
    this.logger.log(ctx, 'calling warehouse-microservice getWarehouses');

    const response = await this.httpService.get<WarehouseOutput[]>(
      ctx,
      apiUrl,
      { params: query },
    );

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    const managers = await this.userService.getManagers(
      ctx,
      undefined,
      response?.data?.map((res) => res.managerUserId),
    );

    const mapManager = new Map<string, UserOutput>();
    managers?.forEach((m) => {
      mapManager.set(m.id, m);
    });

    response?.data?.forEach((res) => {
      res.manager = mapManager.get(res.managerUserId);
    });

    return [response.data, response.meta.count];
  }

  async updateWarehouse(
    ctx: RequestContext,
    id: string,
    rawInput: any,
  ): Promise<WarehouseOutput> {
    this.logger.log(ctx, `${this.updateWarehouse.name} was called`);

    const apiUrl = `${this.warehouseMicroserviceUrl}/${pathWarehouses}/${id}`;
    this.logger.log(ctx, 'calling warehouse-microservice updateWarehouse');

    const response = await this.httpService.put<WarehouseOutput>(
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

  async changeStatus(
    ctx: RequestContext,
    id: string,
    input: ChangeStatusInput,
  ): Promise<WarehouseOutput> {
    this.logger.log(ctx, `${this.changeStatus.name} was called`);

    const apiUrl = `${this.warehouseMicroserviceUrl}/${pathWarehouses}/${id}/status`;
    this.logger.log(
      ctx,
      'calling warehouse-microservice updateStatusWarehouse',
    );

    const response = await this.httpService.put<WarehouseOutput>(
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

  async import(
    ctx: RequestContext,
    warehouseId: string,
    logInput: WarehouseLogInput,
  ): Promise<WarehouseLogOutput> {
    this.logger.log(ctx, `${this.import.name} was called`);

    const apiUrl = `${this.warehouseMicroserviceUrl}/${pathWarehouses}/${warehouseId}/import`;
    this.logger.log(ctx, 'calling warehouse-microservice import');

    const response = await this.httpService.post<WarehouseLogOutput>(
      ctx,
      apiUrl,
      logInput,
    );

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }

  async export(
    ctx: RequestContext,
    warehouseId: string,
    logInput: WarehouseLogInput,
  ): Promise<WarehouseLogOutput> {
    this.logger.log(ctx, `${this.export.name} was called`);

    const apiUrl = `${this.warehouseMicroserviceUrl}/${pathWarehouses}/${warehouseId}/export`;
    this.logger.log(ctx, 'calling warehouse-microservice export');

    const response = await this.httpService.post<WarehouseLogOutput>(
      ctx,
      apiUrl,
      logInput,
    );

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }

  async createWarehouseItem(
    ctx: RequestContext,
    warehouseId: string,
    input: WarehouseItemInput,
  ): Promise<WarehouseItemOutput> {
    this.logger.log(ctx, `${this.createWarehouseItem.name} was called`);

    const apiUrl = `${this.warehouseMicroserviceUrl}/${pathWarehouses}/${warehouseId}/items`;
    this.logger.log(ctx, 'calling warehouse-microservice createItems');

    const response = await this.httpService.post<WarehouseItemOutput>(
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

  async getLogs(
    ctx: RequestContext,
    warehouseId: string,
    query: WarehouseLogQuery,
  ): Promise<[WarehouseLogOutput[], number]> {
    this.logger.log(ctx, `${this.getLogs.name} was called`);

    const apiUrl = `${this.warehouseMicroserviceUrl}/${pathWarehouses}/${warehouseId}/logs`;
    this.logger.log(ctx, 'calling warehouse-microservice getLogs');

    const response = await this.httpService.get<WarehouseLogOutput[]>(
      ctx,
      apiUrl,
      { params: query },
    );

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return [response.data, response.meta.count];
  }

  async getLog(
    ctx: RequestContext,
    warehouseId: string,
    logId: string,
  ): Promise<WarehouseLogOutput> {
    this.logger.log(ctx, `${this.getLog.name} was called`);

    const apiUrl = `${this.warehouseMicroserviceUrl}/${pathWarehouses}/${warehouseId}/logs/${logId}`;
    this.logger.log(ctx, 'calling warehouse-microservice getLog');

    const response = await this.httpService.get<WarehouseLogOutput>(
      ctx,
      apiUrl,
    );

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }
}
