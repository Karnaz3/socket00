import { ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';

export enum TimeSuffix {
  DONOTSEND = 'Do not Send',
  MIN = 'min',
  HOUR = 'hour',
  WEEK = 'week',
}

export interface CompareDateProperty {
  field: string;
  type: TimeSuffix;
}

export function IsValidReminderDate() {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      validator: ReminderDateConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsValidReminderDate' })
export class ReminderDateConstraint implements ValidatorConstraintInterface {
  private errorMessage = '';

  // main validate function
  // validate(value: any, args: ValidationArguments) {
  validate(value: any) {
    if (!value) return false;
    if (value == TimeSuffix.DONOTSEND) {
      return true;
    }
    if (value.split(' ').length > 2) {
      this.errorMessage = 'Invalid Reminder Date Time Format.';
      return false;
    }
    const [prefix, suffix] = value.split(' ');
    const prefixNum = Number(prefix);
    if (isNaN(prefixNum)) return false;

    if (!(suffix as TimeSuffix)) return false;
    return true;
  }

  defaultMessage(): string {
    return this.errorMessage;
  }
}
