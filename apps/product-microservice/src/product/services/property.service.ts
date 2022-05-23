import { PropertyRepository } from './../repositories/property.repository';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PropertyService {
  constructor(
    private readonly logger: AppLogger,
    private readonly propertyRepository: PropertyRepository,
  ) {
    this.logger.setContext(PropertyService.name);
  }
}
