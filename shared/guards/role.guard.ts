import { JwtAuthGuard } from './jwt-auth.guard';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestContext } from '../request-context/request-context.dto';
import { ROLE } from './../constants/common';
export const RoleGuard = (...roles: ROLE[]): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      super.canActivate(context);
      const request = context.switchToHttp().getRequest<RequestContext>();

      const user = request.user;
      return roles.includes(user?.role);
    }
  }

  return mixin(RoleGuardMixin);
};
