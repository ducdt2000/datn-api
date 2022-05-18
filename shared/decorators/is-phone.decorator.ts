import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsPhone', async: false })
export class IsPhone implements ValidatorConstraintInterface {
  validate(time: string): boolean {
    // ignore when target don't have value or not string
    if (!time || typeof time !== 'string') {
      return true;
    }

    // Rule: length is from 3 to 15, start must be 0 or +8, accept [0-9] or -
    const isPhoneRegex = /^[\+0][\d-]{2,14}$/;
    return isPhoneRegex.test(time);
  }

  defaultMessage(args: ValidationArguments): string {
    return `$property: Invalid phone number`;
  }
}
