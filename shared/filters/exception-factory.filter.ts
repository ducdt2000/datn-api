import { DetailErrorCode } from './../errors/detail-error-code';
import { BadRequestException, ValidationError } from '@nestjs/common';

export function exceptionFactory(
  errors: ValidationError[],
): BadRequestException {
  for (const err of errors) {
    for (const key in err.contexts) {
      const ctx = err.contexts[key];
      if (ctx.detail instanceof DetailErrorCode) {
        ctx.detail.message = err.constraints[key];
        return new BadRequestException(ctx.detail);
      }
    }

    if (err.children?.length) {
      return customValidationError(err);
    }
  }
  return new BadRequestException(errors);
}

function customValidationError(err: ValidationError): BadRequestException {
  for (const key in err.children) {
    const errorsChildren = err.children[key].children?.length
      ? err.children[key].children
      : err.children;
    for (const errorChildren of errorsChildren) {
      for (const i in errorChildren.contexts) {
        const ctx = errorChildren.contexts[i];
        if (ctx.detail instanceof DetailErrorCode) {
          ctx.detail.message = errorChildren.constraints[i];
          return new BadRequestException(ctx.detail);
        }
      }
    }
  }
}
