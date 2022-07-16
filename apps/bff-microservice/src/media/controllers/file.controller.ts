import { MAX_FILE_UPLOAD } from './../../../../../shared/constants/common';
import { BaseApiResponse } from './../../../../../shared/dtos/base-api-response.dto';
import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { ReqContext } from './../../../../../shared/request-context/req-context.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
import { FileService } from '../services/file.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { PublicFileOutput } from '../dtos/public-file-output.dto';
import { memoryStorage } from 'multer';
@Controller('files')
@ApiTags('media')
export class FileController {
  constructor(
    private readonly logger: AppLogger,
    private readonly fileService: FileService,
  ) {
    this.logger.setContext(FileController.name);
  }

  @Post('publics/upload')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  async addPublicFile(
    @ReqContext() ctx: RequestContext,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BaseApiResponse<PublicFileOutput>> {
    this.logger.log(ctx, `${this.addPublicFile.name} was called`);

    const data = await this.fileService.uploadPublicFile(ctx, file);

    return { data };
  }

  @Post('publics/uploads')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FilesInterceptor('files', MAX_FILE_UPLOAD, { storage: memoryStorage() }),
  )
  async addBulkPublicFile(
    @ReqContext() ctx: RequestContext,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<BaseApiResponse<PublicFileOutput[]>> {
    this.logger.log(ctx, `${this.addBulkPublicFile.name} was called`);

    const [data, count] = await this.fileService.uploadBulkFile(ctx, files);

    return {
      data,
      meta: { count },
    };
  }
}
