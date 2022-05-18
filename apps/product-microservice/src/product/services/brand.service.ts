import { BrandInput } from './../dtos/brand-input.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { BrandRepository } from './../repositories/brand.repository';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BrandService {
  constructor(
    private readonly logger: AppLogger,
    private readonly brandRepository: BrandRepository,
  ) {
    this.logger.setContext(BrandService.name);
  }

  async createBrand(ctx: RequestContext, input: BrandInput) {
    this.logger.log(ctx, `${this.createBrand.name} was called`);
  }
}
