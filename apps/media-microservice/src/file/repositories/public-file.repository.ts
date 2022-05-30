import { BaseRepository } from './../../../../../shared/repositories/base.repository';
import { PublicFile } from '../entities/public-file.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(PublicFile)
export class PublicFileRepository extends BaseRepository<PublicFile> {
  constructor() {
    super(PublicFile);
  }
}
