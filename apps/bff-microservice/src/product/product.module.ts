import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../config/configuration.module';
import { BrandService } from './services/brand.service';
import { BrandController } from './controllers/brand.controller';
import { ProductTypeService } from './services/product-type.service';
import { ProductTypeController } from './controllers/product-type.controller';
@Module({
  imports: [SharedModule, ConfigurationModule],
  providers: [BrandService, ProductTypeService],
  exports: [BrandService, ProductTypeService],
  controllers: [BrandController, ProductTypeController],
})
export class ProductModule {}
