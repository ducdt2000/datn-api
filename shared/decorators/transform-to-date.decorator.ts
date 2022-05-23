import { Transform, TransformOptions } from 'class-transformer';
import * as moment from 'moment';

interface TransformToDatetimeOptions extends TransformOptions {
  startOf?: moment.unitOfTime.StartOf;
  endOf?: moment.unitOfTime.StartOf;
}

export function TransformToDatetime(
  options?: TransformToDatetimeOptions,
): PropertyDecorator {
  return Transform((param): Date | string => {
    if (typeof param.value !== 'string') {
      return param.value;
    }

    const datetime = moment(param.value);

    if (options) {
      if (options.startOf) {
        return datetime.startOf(options.startOf).toDate();
      } else if (options.endOf) {
        return datetime.endOf(options.endOf).toDate();
      }
      return datetime.toDate();
    }

    return param.value;
  }, options);
}
