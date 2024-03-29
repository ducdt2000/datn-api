import { ProductType } from './../entities/product-type.entity';
import { plainToInstance } from 'class-transformer';
import {
  ErrCategoryCode,
  ErrMicroserviceCode,
  ErrDetailCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from '../../../../../shared/errors/detail-error-code';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductTypeOutput } from './../dtos/product-type-output.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ProductTypeRepository } from './../repositories/product-type.repository';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { ProductTypeInput } from '../dtos/product-type-input.dto';
import { validate } from 'class-validator';

@Injectable()
export class ProductTypeService {
  constructor(
    private readonly logger: AppLogger,
    private readonly productTypeRepository: ProductTypeRepository,
  ) {
    this.logger.setContext(ProductTypeService.name);
  }

  async createProductType(
    ctx: RequestContext,
    input: ProductTypeInput,
  ): Promise<ProductTypeOutput> {
    this.logger.log(ctx, `${this.createProductType.name} was called`);

    const dbType = await this.productTypeRepository.findOne({
      code: input.code,
    });

    if (dbType) {
      throw new BadRequestException(
        new DetailErrorCode(
          ErrCategoryCode.DUPLICATE_VALUE,
          ErrMicroserviceCode.PRODUCT,
          ErrDetailCode.CODE,
          'This code already exists',
        ),
      );
    }

    const type = plainToInstance(ProductType, input);
    const savedType = await this.productTypeRepository.save(type);

    return plainToInstance(ProductTypeOutput, savedType);
  }

  async getProductTypes(
    ctx: RequestContext,
  ): Promise<[ProductTypeOutput[], number]> {
    this.logger.log(ctx, `${this.getProductTypes.name} was called`);

    const [types, count] = await this.productTypeRepository.findAndCount();
    return [plainToInstance(ProductTypeOutput, types), count];
  }

  async getProductType(
    ctx: RequestContext,
    id: string,
  ): Promise<ProductTypeOutput> {
    this.logger.log(ctx, `${this.getProductType.name} was called`);

    const type = await this.productTypeRepository.getById(id);

    return plainToInstance(ProductTypeOutput, type);
  }

  async updateProductType(
    ctx: RequestContext,
    rawInput: any,
    id: string,
  ): Promise<ProductTypeOutput> {
    this.logger.log(ctx, `${this.updateProductType.name} was called`);

    const dbType = await this.productTypeRepository.getById(id);

    const input = plainToInstance(ProductTypeInput, rawInput, {
      excludeExtraneousValues: true,
    });

    const error = await validate(input, { skipUndefinedProperties: true });
    if (error.length) {
      throw new BadRequestException(error);
    }

    const type = this.productTypeRepository.merge(dbType, input);

    const savedType = await this.productTypeRepository.save(type);

    return plainToInstance(ProductTypeOutput, savedType, {
      excludeExtraneousValues: true,
    });
  }

  async deleteProductType(
    ctx: RequestContext,
    id: string,
  ): Promise<ProductTypeOutput> {
    this.logger.log(ctx, `${this.deleteProductType.name} was called`);

    const dbType = await this.productTypeRepository.getById(id);
    const deletedType = await this.productTypeRepository.softRemove(dbType);

    return plainToInstance(ProductTypeOutput, deletedType);
  }
}
