import { ValidationError } from 'class-validator';
import { BaseException } from './base.exception';

export class ValidationException extends BaseException {
  constructor(errors: ValidationError[]) {
    super(errors);
  }
}
