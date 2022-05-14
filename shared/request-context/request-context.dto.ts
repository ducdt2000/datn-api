import { UserAccessInfo } from './../dtos/user-access-info.dto';

export class RequestContext {
  public requestID: string;

  public url: string;

  public ip: string;

  public user: UserAccessInfo;
}
