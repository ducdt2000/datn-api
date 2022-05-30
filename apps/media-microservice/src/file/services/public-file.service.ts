import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { plainToInstance } from 'class-transformer';
import { PublicFileOutput } from './../../dtos/public-file-output.dto';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from './../../../../../shared/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { PublicFileRepository } from '../repositories/public-file.repository';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { PublicFile } from '../entities/public-file.entity';

@Injectable()
export class PublicFileService {
  private readonly s3: S3;

  constructor(
    private readonly logger: AppLogger,
    private readonly publicFileRepository: PublicFileRepository,
    private readonly configService: ConfigService,
  ) {
    this.logger.setContext(PublicFileService.name);
    this.s3 = new S3();
  }

  async uploadPublicFile(
    ctx: RequestContext,
    file: Express.Multer.File,
  ): Promise<PublicFileOutput> {
    this.logger.log(ctx, `${this.uploadPublicFile.name} was called`);
    const bucket = this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME');
    const uploadResult = await this.s3
      .upload({
        Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
        Body: file.buffer,
        Key: `${uuidv4()}-${file.originalname}`,
      })
      .promise();

    const newFile = this.publicFileRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    const savedFile = await this.publicFileRepository.save(newFile);
    return plainToInstance(PublicFileOutput, savedFile);
  }

  async uploadBulkFile(
    ctx: RequestContext,
    files: Array<Express.Multer.File>,
  ): Promise<[PublicFileOutput[], number]> {
    this.logger.log(ctx, `${this.uploadBulkFile.name} was called`);
    let uploadResult: S3.ManagedUpload.SendData;

    const dbFiles: PublicFile[] = [];

    for (const file of files) {
      uploadResult = await this.s3
        .upload({
          Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
          Body: file.buffer,
          Key: `${uuidv4()}-${file.originalname}`,
        })
        .promise();

      const newFile = this.publicFileRepository.create({
        key: uploadResult.Key,
        url: uploadResult.Location,
      });
      dbFiles.push(newFile);
    }

    const savedFiles = await this.publicFileRepository.save(dbFiles);

    return [savedFiles, savedFiles.length];
  }
}
