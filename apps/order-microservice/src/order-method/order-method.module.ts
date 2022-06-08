import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [SharedModule, ConfigModule, TypeOrmModule.forFeature([])],
  providers: [],
  controllers: [],
  exports: [],
})
export class OrderMethodModule {}
