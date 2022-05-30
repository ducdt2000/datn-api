import { FileController } from './controllers/file.controller';
import { PublicFileService } from './services/public-file.service';
import { PublicFileRepository } from './repositories/public-file.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    SharedModule,
    ConfigModule,
    TypeOrmModule.forFeature([PublicFileRepository]),
  ],
  providers: [PublicFileService],
  controllers: [FileController],
  exports: [PublicFileService],
})
export class FileModule {}
