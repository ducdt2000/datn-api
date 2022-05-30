import { BaseApiResponse } from './../../../../../shared/dtos/base-api-response.dto';
import { PublicFileOutput } from './../../dtos/public-file-output.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { PublicFileService } from './../services/public-file.service';
import { AppLogger } from '../../../../../shared/logger/logger.service';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ReqContext } from 'shared/request-context/req-context.decorator';
import { Express } from 'express';

@Controller('files')
@ApiTags('files')
export class FileController {
  constructor(
    private readonly logger: AppLogger,
    private readonly publicFileService: PublicFileService,
  ) {
    this.logger.setContext(FileController.name);
  }

  @Post('publics/upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async addPublicFile(
    @ReqContext() ctx: RequestContext,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BaseApiResponse<PublicFileOutput>> {
    this.logger.log(ctx, `${this.addPublicFile.name} was called`);

    const data = await this.publicFileService.uploadPublicFile(ctx, file);

    return {
      data,
      meta: { count: 1 },
    };
  }

  @Post('publics/uploads')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor('files'))
  async addBulkPublicFile(
    @ReqContext() ctx: RequestContext,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<BaseApiResponse<PublicFileOutput[]>> {
    this.logger.log(ctx, `${this.addBulkPublicFile.name} was called`);

    const [data, count] = await this.publicFileService.uploadBulkFile(
      ctx,
      files,
    );

    return {
      data,
      meta: { count },
    };
  }
}
