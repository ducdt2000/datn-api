import { Request } from 'express';
import {
  FORWARDED_FOR_TOKEN_HEADER,
  REQUEST_ID_TOKEN_HEADER,
} from '../../constants/common';

import { RequestContext } from '../request-context.dto';

// Creates a RequestContext object from Request
export function createRequestContext(request: Request): RequestContext {
  const ctx = new RequestContext();
  ctx.requestID = request.header(REQUEST_ID_TOKEN_HEADER);
  ctx.url = request.url;
  ctx.ip = request.header(FORWARDED_FOR_TOKEN_HEADER)
    ? request.header(FORWARDED_FOR_TOKEN_HEADER)
    : request.ip;

  // Checking If user is set in req header or req object.
  const headerUser = request.header('user');
  if (request['user']) {
    ctx.user = request['user'];
  } else if (headerUser) {
    ctx.user = JSON.parse(headerUser);
  }

  return ctx;
}
