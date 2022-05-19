import { BrandQuery } from './../dtos/brand-query.dto';
import { BrandOutput } from './../dtos/brand-output.dto';
import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { Brand } from './../entities/brand.entity';
import { plainToInstance } from 'class-transformer';
import { BrandInput } from './../dtos/brand-input.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { BrandRepository } from './../repositories/brand.repository';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { slugify } from './../../../../../shared/util/string.utils';
import { Not } from 'typeorm';

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

    let slug: string;
    if (!input.slug) {
      slug = slugify(input.name);
    }

    const dbBrand = await this.brandRepository.findOne({ slug });
    if (dbBrand) {
      throw new BadRequestException(
        new DetailErrorCode(
          ErrCategoryCode.INVALID_PARAM,
          ErrMicroserviceCode.PRODUCT,
          ErrDetailCode.SLUG,
          'This slug already exists',
        ),
      );
    }

    const brand = plainToInstance(Brand, {
      ...input,
      slug: slugify(input.name),
    });

    const savedBrand = this.brandRepository.save(brand);
    return plainToInstance(BrandOutput, savedBrand, {
      excludeExtraneousValues: true,
    });
  }

  async getBrands(
    ctx: RequestContext,
    query: BrandQuery,
  ): Promise<[BrandOutput[], number]> {
    this.logger.log(ctx, `${this.getBrands.name} was called`);
    const [brands, count] = await this.brandRepository.getByConditions(query);
    return [plainToInstance(BrandOutput, brands), count];
  }

  async updateBrand(
    ctx: RequestContext,
    input: BrandInput,
    id: string,
  ): Promise<BrandOutput> {
    this.logger.log(ctx, `${this.updateBrand.name} was called`);

    if (!input.slug) {
      input.slug = slugify(input.name);
    }

    const dbBrand = await this.brandRepository.getById(id);

    const [, count] = await this.brandRepository.findAndCount({
      slug: input.slug,
      id: Not(dbBrand.id),
    });
    if (count > 0) {
      throw new BadRequestException(
        new DetailErrorCode(
          ErrCategoryCode.INVALID_PARAM,
          ErrMicroserviceCode.PRODUCT,
          ErrDetailCode.SLUG,
          'This slug already exists',
        ),
      );
    }

    const brand = plainToInstance(Brand, { ...input, id });
    return this.brandRepository.save(brand);
  }

  async deleteBrand(ctx: RequestContext, id: string): Promise<BrandOutput> {
    this.logger.log(ctx, `${this.deleteBrand.name} was called`);

    const dbBrand = await this.brandRepository.getById(id);

    const result = await this.brandRepository.softRemove(dbBrand);
    return plainToInstance(BrandOutput, result);
  }
}
