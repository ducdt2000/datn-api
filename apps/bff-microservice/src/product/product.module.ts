import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../config/configuration.module';
import { BrandService } from './services/brand.service';
import { BrandController } from './controllers/brand.controller';
@Module({
  imports: [SharedModule, ConfigurationModule],
  providers: [BrandService],
  exports: [BrandService],
  controllers: [BrandController],
})
export class ProductModule {}
