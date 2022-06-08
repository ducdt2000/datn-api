import { AuthGuard } from '@nestjs/passport';

export class LocalAuthenticationGuard extends AuthGuard('local') {}
