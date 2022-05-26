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
import { ProductVersionRepository } from './../repositories/product-version.repository';
import { ProductInput } from './../dtos/product-input.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ProductRepository } from './../repositories/product.repository';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductOutput } from '../dtos/product-output.dto';
import { checkDuplicateArrayString, slugify } from 'shared/util/string.utils';
import { getConnection, In } from 'typeorm';
import { ProductQuery } from '../dtos/product-query.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly logger: AppLogger,
    private readonly productRepository: ProductRepository,
    private readonly productVersionRepository: ProductVersionRepository,
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

    let codes: string[] = input.productVersions.map((version) => version.code);

    try {
      checkDuplicateArrayString(codes);
    } catch (ex) {
      throw new BadRequestException(
        new DetailErrorCode(
          ErrCategoryCode.DUPLICATE_VALUE,
          ErrMicroserviceCode.PRODUCT,
          ErrDetailCode.CODE,
          `Code ${ex.message.join(', ')} are duplicate`,
        ),
      );
    }

    const dbProduct = await this.productRepository.findOne({
      slug: input.slug,
    });
    if (dbProduct) {
      throw new BadRequestException(
        new DetailErrorCode(
          ErrCategoryCode.DUPLICATE_VALUE,
          ErrMicroserviceCode.PRODUCT,
          ErrDetailCode.SLUG,
          'This slug already exists',
        ),
      );
    }

    const dbCodes = await this.productVersionRepository.find({
      code: In(codes),
    });

    if (dbCodes.length) {
      throw new BadRequestException(
        new DetailErrorCode(
          ErrCategoryCode.DUPLICATE_VALUE,
          ErrMicroserviceCode.PRODUCT,
          ErrDetailCode.CODE,
          `Code ${dbCodes.join(', ')} already exists`,
        ),
      );
    }

    const product = plainToInstance(Product, {
      ...input,
      productType,
      brand,
    });

    let savedProduct: Product;
    await getConnection().transaction(async (trans) => {
      const productRepo = trans.getCustomRepository(ProductRepository);
      const productVersionRepo = trans.getCustomRepository(
        ProductVersionRepository,
      );

      savedProduct = await productRepo.save(product);

      product.productVersions.forEach((version) => {
        version.product = savedProduct;
        if (!version.defaultImageLink) {
          version.defaultImageLink = version.imageLinks[0];
        }
      });
      await productVersionRepo.save(product.productVersions);
    });

    savedProduct = await this.productRepository.getDetail(savedProduct.id);

    return plainToInstance(ProductOutput, savedProduct);
  }

  async getProduct(ctx: RequestContext, id: string): Promise<ProductOutput> {
    this.logger.log(ctx, `${this.getProduct.name} was called`);

    return this.productRepository.getById(id);
  }

  async getProducts(
    ctx: RequestContext,
    query: ProductQuery,
  ): Promise<[ProductOutput[], number]> {
    this.logger.log(ctx, `${this.getProducts.name} was called`);
    return this.productRepository.getByConditions(query);
  }
}
