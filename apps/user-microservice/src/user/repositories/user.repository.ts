import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../../../shared/repositories/base.repository';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }
}
