import { AppLogger } from './../../../../../shared/logger/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext(OrderService.name);
  }
}
