import { ROLE } from '../constants/common';
import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roleLevels: ROLE[]): CustomDecorator<string> =>
  SetMetadata(ROLES_KEY, roleLevels);
