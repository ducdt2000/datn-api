import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as moment from 'moment';

@ValidatorConstraint({ name: 'IsDateBefore', async: false })
export class IsDateBefore implements ValidatorConstraintInterface {
  validate(time: Date, args: ValidationArguments): Promise<boolean> | boolean {
    if (
      !(time instanceof Date) ||
      args.constraints.length === 0 ||
      !(args.object[args.constraints[0]] instanceof Date)
    ) {
      return true;
    }

    const timeFrom = moment(time).startOf('day');
    const timeTo = moment(args.object[args.constraints[0]]).startOf('day');

    return timeFrom.isBefore(timeTo);
  }

  defaultMessage(args: ValidationArguments): string {
    const [relatedPropertyName] = args.constraints;
    return `$property must before ${relatedPropertyName}`;
  }
}
