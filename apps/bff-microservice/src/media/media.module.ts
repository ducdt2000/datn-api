import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../config/configuration.module';
import { FileService } from './services/file.service';
import { FileController } from './controllers/file.controller';
@Module({
  imports: [SharedModule, ConfigurationModule],
  providers: [FileService],
  exports: [FileService],
  controllers: [FileController],
})
export class MediaModule {}
