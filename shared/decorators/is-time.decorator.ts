import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { checkTime } from '../util/datetime.utils';

@ValidatorConstraint({ name: 'IsTime', async: false })
export class IsTime implements ValidatorConstraintInterface {
  validate(time: string | Date): boolean {
    if (time instanceof Date) {
      return true;
    }

    return checkTime(time);
  }

  defaultMessage(args: ValidationArguments): string {
    return `$property: Valid time (hh:mm[:ss] or hh:mm[:ss] am) is required`;
  }
}
