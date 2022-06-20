import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { plainToInstance } from 'class-transformer';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { WarehouseLogRepository } from '../repositories/warehouse-log.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { WarehouseLogOutput } from '../dtos/warehouse-log-output.dto';
import { WarehouseLogQuery } from '../dtos/warehouse-log-query.dto';

@Injectable()
export class WarehouseLogService {
  constructor(
    private readonly logger: AppLogger,
    private readonly warehouseLogRepository: WarehouseLogRepository,
  ) {
    this.logger.setContext(WarehouseLogService.name);
  }

  async getLogs(
    ctx: RequestContext,
    warehouseId: string,
    query: WarehouseLogQuery,
  ): Promise<[WarehouseLogOutput[], number]> {
    this.logger.log(ctx, `${this.getLogs.name} was called`);

    const [data, count] = await this.warehouseLogRepository.getByConditions(
      warehouseId,
      query,
    );

    return [
      plainToInstance(WarehouseLogOutput, data, {
        excludeExtraneousValues: true,
      }),
      count,
    ];
  }

  async getLog(
    ctx: RequestContext,
    warehouseId: string,
    logId: string,
  ): Promise<WarehouseLogOutput> {
    this.logger.log(ctx, `${this.getLog.name} was called`);

    const warehouseLog = await this.warehouseLogRepository.getDetail(logId);

    if (warehouseLog.warehouseId !== warehouseId) {
      throw new NotFoundException(
        new DetailErrorCode(
          ErrCategoryCode.ID_NOT_REGISTER,
          ErrMicroserviceCode.WAREHOUSE,
          ErrDetailCode.WAREHOUSE_LOG,
          'Warehouse log not found',
        ),
      );
    }

    return plainToInstance(WarehouseLogOutput, warehouseLog, {
      excludeExtraneousValues: true,
    });
  }
}
