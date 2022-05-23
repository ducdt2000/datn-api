import { ProductVersionRepository } from './repositories/product-version.repository';
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

@Module({
  imports: [
    SharedModule,
    ConfigModule,
    TypeOrmModule.forFeature([
      ProductRepository,
      BrandRepository,
      ProductTypeRepository,
      ProductVersionRepository,
    ]),
  ],
  providers: [BrandService, ProductService, ProductTypeService],
  controllers: [BrandController, ProductController, ProductTypeController],
  exports: [BrandService, ProductService, ProductTypeService],
})
export class ProductModule {}
