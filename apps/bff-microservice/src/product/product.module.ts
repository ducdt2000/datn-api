import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../config/configuration.module';
import { BrandService } from './services/brand.service';
import { BrandController } from './controllers/brand.controller';
import { ProductTypeService } from './services/product-type.service';
import { ProductTypeController } from './controllers/product-type.controller';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { CartModule } from '../cart/cart.module';
import { CustomProductService } from './services/custom-product.service';
import { CustomProductController } from './controllers/custom-product.controller';
@Module({
  imports: [SharedModule, ConfigurationModule, CartModule],
  providers: [
    BrandService,
    ProductTypeService,
    ProductService,
    CustomProductService,
  ],
  exports: [
    BrandService,
    ProductTypeService,
    ProductService,
    CustomProductService,
  ],
  controllers: [
    BrandController,
    ProductTypeController,
    ProductController,
    CustomProductController,
  ],
})
export class ProductModule {}
