import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as moment from 'moment';

@ValidatorConstraint({ name: 'IsTimeBefore', async: false })
export class IsTimeBefore implements ValidatorConstraintInterface {
  validate(time: Date, args: ValidationArguments): Promise<boolean> | boolean {
    if (
      !(time instanceof Date) ||
      args.constraints.length === 0 ||
      !(args.object[args.constraints[0]] instanceof Date)
    ) {
      return true;
    }

    const timeFrom = moment(time);
    const timeTo = moment(args.object[args.constraints[0]]).set({
      year: timeFrom.get('year'),
      month: timeFrom.get('month'),
      date: timeFrom.get('date'),
    });

    return timeFrom.isBefore(timeTo);
  }

  defaultMessage(args: ValidationArguments): string {
    const [relatedPropertyName] = args.constraints;
    return `$property must before ${relatedPropertyName}`;
  }
}
