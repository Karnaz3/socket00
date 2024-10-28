import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

export enum CompareDateEnum {
  SAME = 'SAME',
  GREATERTHAN = 'GREATERTHAN',
  LESSTHAN = 'LESSTHAN',
  GREATERTHANORSAME = 'GREATERTHANORSAME',
}
export interface CompareDateProperty {
  field: string;
  type: CompareDateEnum;
}

export function CompareDate(property: [field: string, type: CompareDateEnum], validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: property, // parameter value
      validator: CompareConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'CompareDate' })
export class CompareConstraint implements ValidatorConstraintInterface {
  private errorMessage = '';

  // main validate function
  validate(value: any, args: ValidationArguments) {
    return this.compareDate(value, args);
  }

  // default message
  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return this.errorMessage || `${args.property} should be greater than ${relatedPropertyName}`;
  }

  // compare dates according to type
  compareDate(value: any, args: ValidationArguments): boolean {
    // getting array of args of decorator
    // relatedpropertyName is a date(field) to which we are going to compare our field(date)
    // type is how we want to compare
    const [relatedPropertyName, type] = args.constraints;

    // getting value of comparing field i.e. the value of field provided in argument
    const relatedValue = (args.object as any)[relatedPropertyName];

    // date 1: current field value i.e. in which decorator is present
    const date1: Date = new Date(value);

    // date 2: field value of passed field in argument
    const date2: Date = new Date(relatedValue);

    // checking if any of the date is invalid date type
    if (date1.toString() === 'Invalid Date' || date2.toString() === 'Invalid Date') {
      this.errorMessage = `Invalid ${args.property} or ${relatedPropertyName}`;
      return false;
    }

    switch (type) {
      case CompareDateEnum.GREATERTHAN:
        return this.isGreaterThan(date1, date2, args.property, relatedPropertyName);
      case CompareDateEnum.LESSTHAN:
        return this.isLessThan(date1, date2, args.property, relatedPropertyName);
      case CompareDateEnum.SAME:
        return this.isSame(date1, date2, args.property, relatedPropertyName);
      case CompareDateEnum.GREATERTHANORSAME:
        return this.isGreatherThanOrSame(date1, date2, args.property, relatedPropertyName);
      default:
        return false;
    }
  }

  isGreaterThan(date1: Date, date2: Date, property: string, relatedProperty: string): boolean {
    if (new Date(date1).getTime() > new Date(date2).getTime()) {
      return true;
    }
    this.errorMessage = `${property} should be greater than ${relatedProperty}`;
    return false;
  }
  isLessThan(date1: Date, date2: Date, property: string, relatedProperty: string): boolean {
    if (new Date(date1).getTime() < new Date(date2).getTime()) {
      return true;
    }
    this.errorMessage = `${property} should be less than ${relatedProperty}`;
    return false;
  }
  isSame(date1: Date, date2: Date, property: string, relatedProperty: string): boolean {
    if (new Date(date1).getTime() === new Date(date2).getTime()) {
      return true;
    }
    this.errorMessage = `${property} should match ${relatedProperty}`;
    return false;
  }
  isGreatherThanOrSame(date1: Date, date2: Date, property: string, relatedProperty: string): boolean {
    if (
      new Date(date1).getTime() > new Date(date2).getTime() ||
      new Date(date1).getTime() === new Date(date2).getTime()
    ) {
      return true;
    }
    this.errorMessage = `${property} should be greater than or equal to ${relatedProperty}`;
    return false;
  }
}
