import { ROLE } from '../constants/common';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { getUserAuthLevel } from '../util/role.utils';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoleLevels = this.reflector.getAllAndOverride<ROLE[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoleLevels) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const authLevel = getUserAuthLevel(user);
    if (requiredRoleLevels.includes(authLevel)) {
      return true;
    }

    throw new ForbiddenException(
      `User with role ${user.role} does not have access to this route`,
    );
  }
}
