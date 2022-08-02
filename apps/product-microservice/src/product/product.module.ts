import { ProductTypeController } from './controllers/product-type.controller';
import { ProductTypeService } from './services/product-type.service';
import { ProductTypeRepository } from './repositories/product-type.repository';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { BrandController } from './controllers/brand.controller';
import { BrandService } from './services/brand.service';
import { BrandRepository } from './repositories/brand.repository';
import { ProductRepository } from './repositories/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { PropertyRepository } from './repositories/property.repository';
import { CustomProductTemplateRepository } from './repositories/custom-product-template.repository';
import { CustomProductValueRepository } from './repositories/custom-product-value.repository';
import { CustomProductRepository } from './repositories/custom-product.repository';
import { CustomPropertyRepository } from './repositories/custom-property.repository';
import { CustomProductService } from './services/custom-product.service';
import { CustomProductController } from './controllers/custom-product.controller';

@Module({
  imports: [
    SharedModule,
    ConfigModule,
    TypeOrmModule.forFeature([
      ProductRepository,
      BrandRepository,
      ProductTypeRepository,
      PropertyRepository,

      CustomProductTemplateRepository,
      CustomProductValueRepository,
      CustomProductRepository,
      CustomPropertyRepository,
    ]),
  ],
  providers: [
    BrandService,
    ProductService,
    ProductTypeService,
    CustomProductService,
  ],
  controllers: [
    BrandController,
    ProductController,
    ProductTypeController,
    CustomProductController,
  ],
  exports: [
    BrandService,
    ProductService,
    ProductTypeService,
    CustomProductService,
  ],
})
export class ProductModule {}
