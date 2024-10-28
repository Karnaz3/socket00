import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

export function IsRequiredAndAllowNull(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CompareConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsRequiredAndAllowNull' })
export class CompareConstraint implements ValidatorConstraintInterface {
  private errorMessage = '';

  // main validate function
  validate(value: any, args: ValidationArguments) {
    if (value === undefined || value === 'undefined') {
      return false;
    }

    if (value === null || value === 'null') {
      args.object[args.property] = null;
      return true;
    }
    return true;
  }

  // default message
  defaultMessage(args: ValidationArguments) {
    return this.errorMessage || `${args.property} cannot be empty.`;
  }
}
