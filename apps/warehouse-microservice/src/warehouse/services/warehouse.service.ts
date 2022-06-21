import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { getConnection } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import {
  WAREHOUSE_STATUS,
  WAREHOUSE_LOG_TYPE,
} from './../../../../../shared/constants/common';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { WarehouseLogRepository } from '../repositories/warehouse-log.repository';
import { WarehouseRepository } from '../repositories/warehouse.repository';
import { WarehouseInput } from '../dtos/warehouse-input.dto';
import { WarehouseOutput } from '../dtos/warehouse-output.dto';
import { WarehouseQuery } from '../dtos/warehouse-query.dto';
import { validate } from 'class-validator';
import { ChangeStatusInput } from '../dtos/change-status-input.dto';
import { WarehouseLogInput } from '../dtos/warehouse-log-input.dto';
import { WarehouseLogOutput } from '../dtos/warehouse-log-output.dto';

@Injectable()
export class WarehouseService {
  constructor(
    private readonly logger: AppLogger,
    private readonly warehouseLogRepository: WarehouseLogRepository,
    private readonly warehouseRepository: WarehouseRepository,
  ) {
    this.logger.setContext(WarehouseService.name);
  }

  async createWarehouse(
    ctx: RequestContext,
    input: WarehouseInput,
  ): Promise<WarehouseOutput> {
    this.logger.log(ctx, `${this.createWarehouse.name} was called`);

    const warehouse = this.warehouseRepository.create({
      ...input,
      status: WAREHOUSE_STATUS.INACTIVE,
    });

    const savedWarehouse = await this.warehouseRepository.save(warehouse);

    return plainToInstance(WarehouseOutput, savedWarehouse, {
      excludeExtraneousValues: true,
    });
  }

  async getWarehouse(
    ctx: RequestContext,
    warehouseId: string,
  ): Promise<WarehouseOutput> {
    this.logger.log(ctx, `${this.createWarehouse.name} was called`);

    const warehouse = await this.warehouseRepository.getDetail(warehouseId);

    return plainToInstance(WarehouseOutput, warehouse, {
      excludeExtraneousValues: true,
    });
  }

  async getWarehouses(
    ctx: RequestContext,
    query: WarehouseQuery,
  ): Promise<[WarehouseOutput[], number]> {
    this.logger.log(ctx, `${this.createWarehouse.name} was called`);

    return this.warehouseRepository.getByConditions(query);
  }

  async updateWarehouse(
    ctx: RequestContext,
    id: string,
    rawInput: any,
  ): Promise<WarehouseOutput> {
    this.logger.log(ctx, `${this.updateWarehouse.name} was called`);

    const dbWarehouse = await this.warehouseRepository.getDetail(id);

    const input = plainToInstance(WarehouseInput, rawInput, {
      excludeExtraneousValues: true,
    });

    const error = await validate(input, { skipUndefinedProperties: true });

    if (error.length) {
      throw new BadRequestException(error);
    }

    this.warehouseRepository.merge(dbWarehouse, input);

    const savedWarehouse = await this.warehouseRepository.save(dbWarehouse);

    return plainToInstance(WarehouseOutput, savedWarehouse, {
      excludeExtraneousValues: true,
    });
  }

  async changeStatus(
    ctx: RequestContext,
    id: string,
    input: ChangeStatusInput,
  ): Promise<WarehouseOutput> {
    this.logger.log(ctx, `${this.changeStatus.name} was called`);

    const dbWarehouse = await this.warehouseRepository.getDetail(id);

    dbWarehouse.status = input.status;

    const savedWarehouse = await this.warehouseRepository.save(dbWarehouse);

    return plainToInstance(WarehouseOutput, savedWarehouse, {
      excludeExtraneousValues: true,
    });
  }

  async createLog(
    ctx: RequestContext,
    warehouseId: string,
    logInput: WarehouseLogInput,
    type: WAREHOUSE_LOG_TYPE,
  ): Promise<WarehouseLogOutput> {
    this.logger.log(ctx, `${this.createLog.name} was called`);

    const dbWarehouse = await this.warehouseRepository.getDetail(warehouseId);

    const updateItemLogIds = logInput.itemLogs.map((item) => item.itemId);

    dbWarehouse.items.forEach((item) => {
      const index = updateItemLogIds.indexOf(item.id);

      if (index > -1) {
        if (type === WAREHOUSE_LOG_TYPE.IMPORT) {
          item.amount += logInput.itemLogs[index].amount;
        } else {
          if (item.amount < logInput.itemLogs[index].amount) {
            throw new BadRequestException(
              new DetailErrorCode(
                ErrCategoryCode.INVALID_PARAM,
                ErrMicroserviceCode.WAREHOUSE,
                ErrDetailCode.AMOUNT,
                `Warehouse not enough ${item.code} (${item.amount})`,
              ),
            );
          }
          item.amount -= logInput.itemLogs[index].amount;
        }
      }
    });

    let logId: string;

    await getConnection().transaction(async (trans) => {
      const tranWarehouseLogRepo = trans.getCustomRepository(
        WarehouseLogRepository,
      );

      const warehouseLog = tranWarehouseLogRepo.create({
        ...logInput,
        warehouseId,
      });

      const [{ id }] = await Promise.all([
        tranWarehouseLogRepo.save(warehouseLog),
        trans.save(dbWarehouse),
      ]);
      logId = id;
    });
    const savedLogInput = await this.warehouseLogRepository.getDetail(logId);

    return plainToInstance(WarehouseLogOutput, savedLogInput, {
      excludeExtraneousValues: true,
    });
  }
}
