import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
@ValidatorConstraint({ name: 'IsDuplicateInArray', async: false })
export class IsDuplicateInArrayConstraint
  implements ValidatorConstraintInterface
{
  duplicateValueArr = [];
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  validate(value: any): Promise<boolean> | boolean {
    if (Array.isArray(value) && value.length) {
      const duplicateValue = value.filter(
        (item, index) => value.indexOf(item) !== index,
      );
      if (duplicateValue.length) {
        this.duplicateValueArr = duplicateValue;
        return false;
      }
    }
    return true;
  }
  defaultMessage(): string {
    return `${this.duplicateValueArr} is duplicate`;
  }
}
export function IsDuplicateInArray(
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
      validator: IsDuplicateInArrayConstraint,
    });
  };
}
