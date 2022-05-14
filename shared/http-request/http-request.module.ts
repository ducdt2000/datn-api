import { AppLoggerModule } from './../logger/logger.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { HttpRequestService } from './http-request.service';

@Module({
  imports: [HttpModule, AppLoggerModule],
  providers: [HttpRequestService],
  exports: [HttpRequestService],
})
export class HttpRequestModule {}
