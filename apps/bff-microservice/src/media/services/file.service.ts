import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { HttpRequestService } from 'shared/http-request/http-request.service';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PublicFileOutput } from '../dtos/public-file-output.dto';
import FormData = require('form-data');
const pathFiles = 'v1/api/files';

@Injectable()
export class FileService {
  constructor(
    private readonly logger: AppLogger,
    private httpService: HttpRequestService,
    private configService: ConfigService,
  ) {
    this.logger.setContext(FileService.name);
  }

  async uploadPublicFile(
    ctx: RequestContext,
    file: Express.Multer.File,
  ): Promise<PublicFileOutput> {
    this.logger.log(ctx, `${this.uploadPublicFile.name} was called`);
    const fileMicroserviceUrl =
      this.configService.get<string>('microservice.media');
    const apiUrl = `${fileMicroserviceUrl}/${pathFiles}/publics/upload`;
    this.logger.log(ctx, 'calling media-microservice uploadBulkFiles');

    const formData = new FormData();
    const headers = formData.getHeaders();
    formData.append('file', file.buffer, file.originalname);

    const response = await this.httpService.post<PublicFileOutput>(
      ctx,
      apiUrl,
      formData,
      headers,
    );

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return response.data;
  }

  async uploadBulkFile(
    ctx: RequestContext,
    files: Array<Express.Multer.File>,
  ): Promise<[PublicFileOutput[], number]> {
    this.logger.log(ctx, `${this.uploadBulkFile.name} was called`);

    const fileMicroserviceUrl =
      this.configService.get<string>('microservice.media');
    const apiUrl = `${fileMicroserviceUrl}/${pathFiles}/publics/uploads`;
    this.logger.log(ctx, 'calling media-microservice uploadBulkFiles');

    const formData = new FormData();
    const headers = formData.getHeaders();

    files.forEach((file, index) => {
      formData.append('files', file.buffer, file.originalname);
    });

    const response = await this.httpService.post<PublicFileOutput[]>(
      ctx,
      apiUrl,
      formData,
      {
        headers,
      },
    );

    if (response.error) {
      throw new HttpException(
        response.error.details,
        response.error.statusCode,
      );
    }

    return [response.data, response.meta.count];
  }
}
