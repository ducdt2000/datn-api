import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
@ValidatorConstraint({ name: 'IsNotBlank', async: false })
export class IsNotBlankConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  validate(value: any, args: ValidationArguments): Promise<boolean> | boolean {
    return typeof value === 'string' && value.trim().length > 0;
  }
  defaultMessage(args: ValidationArguments): string {
    return `$property must not blank`;
  }
}
export function IsNotBlank(
  property: string,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsNotBlankConstraint,
    });
  };
}
