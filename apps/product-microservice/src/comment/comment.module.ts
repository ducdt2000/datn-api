import { SharedModule } from './../../../../shared/shared.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [SharedModule, ConfigModule, TypeOrmModule.forFeature([])],
})
export class CommentModule {}
