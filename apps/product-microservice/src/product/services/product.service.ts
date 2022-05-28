import { ProductUpdateInput } from './../dtos/product-update-input.dto';
import { ProductTypeRepository } from './../repositories/product-type.repository';
import { BrandRepository } from './../repositories/brand.repository';
import { Product } from './../entities/product.entity';
import { plainToInstance } from 'class-transformer';
import {
  ErrCategoryCode,
  ErrDetailCode,
  ErrMicroserviceCode,
} from './../../../../../shared/constants/errors';
import { DetailErrorCode } from './../../../../../shared/errors/detail-error-code';
import { ProductInput } from './../dtos/product-input.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ProductRepository } from './../repositories/product.repository';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductOutput } from '../dtos/product-output.dto';
import { slugify } from 'shared/util/string.utils';
import { Not } from 'typeorm';
import { ProductQuery } from '../dtos/product-query.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly logger: AppLogger,
    private readonly productRepository: ProductRepository,
    private readonly brandRepository: BrandRepository,
    private readonly productTypeRepository: ProductTypeRepository,
  ) {
    this.logger.setContext(ProductService.name);
  }

  async createProduct(
    ctx: RequestContext,
    input: ProductInput,
  ): Promise<ProductOutput> {
    this.logger.log(ctx, `${this.createProduct.name} was called`);

    const [brand, productType] = await Promise.all([
      this.brandRepository.getById(input.brandId),
      this.productTypeRepository.getById(input.productTypeId),
    ]);

    if (!input.slug) {
      input.slug = slugify(input.name);
    }

    const dbProduct = await this.productRepository.find({
      where: [{ slug: input.slug }, { code: input.code }],
    });
    if (dbProduct.length) {
      throw new BadRequestException(
        new DetailErrorCode(
          ErrCategoryCode.DUPLICATE_VALUE,
          ErrMicroserviceCode.PRODUCT,
          ErrDetailCode.SLUG,
          'This slug or code already exists',
        ),
      );
    }

    const product = plainToInstance(Product, {
      ...input,
      productType,
      brand,
    });

    if (!product.defaultImageLink) {
      product.defaultImageLink = product.imageLinks[0];
    }
    const savedProduct = await this.productRepository.save(product);

    return plainToInstance(ProductOutput, savedProduct);
  }

  async getProduct(ctx: RequestContext, id: string): Promise<ProductOutput> {
    this.logger.log(ctx, `${this.getProduct.name} was called`);

    return this.productRepository.getDetail(id);
  }

  async getProducts(
    ctx: RequestContext,
    query: ProductQuery,
  ): Promise<[ProductOutput[], number]> {
    this.logger.log(ctx, `${this.getProducts.name} was called`);
    return this.productRepository.getByConditions(query);
  }

  async updateProduct(
    ctx: RequestContext,
    id: string,
    input: ProductUpdateInput,
  ): Promise<ProductOutput> {
    this.logger.log(ctx, `${this.updateProduct.name} was called`);

    const dbProduct = await this.productRepository.getById(id);

    if (input.slug) {
      const checkSlug = await this.productRepository.findOne({
        id: Not(id),
        slug: input.slug,
      });
      if (checkSlug) {
        throw new BadRequestException(
          new DetailErrorCode(
            ErrCategoryCode.DUPLICATE_VALUE,
            ErrMicroserviceCode.PRODUCT,
            ErrDetailCode.SLUG,
            `Slug ${input.slug} was existed`,
          ),
        );
      }
    }
    if (input.code) {
      const checkCode = await this.productRepository.findOne({
        id: Not(id),
        code: input.code,
      });
      if (checkCode) {
        throw new BadRequestException(
          new DetailErrorCode(
            ErrCategoryCode.DUPLICATE_VALUE,
            ErrMicroserviceCode.PRODUCT,
            ErrDetailCode.CODE,
            `Code ${input.code} was existed`,
          ),
        );
      }
    }

    const product = this.productRepository.merge(dbProduct, input);
    const savedProduct = await this.productRepository.save(product);
    return plainToInstance(ProductOutput, savedProduct);
  }

  async deleteProduct(ctx: RequestContext, id: string): Promise<ProductOutput> {
    this.logger.log(ctx, `${this.deleteProduct.name} was called`);
    const product = await this.productRepository.getDetail(id);

    const result = await this.productRepository.softRemove(product);

    return plainToInstance(ProductOutput, result);
  }
}
