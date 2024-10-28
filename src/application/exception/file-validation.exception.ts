import { BaseException } from './base.exception';

export default class FileValidationException extends BaseException {
  constructor(message: string = 'Validation failed', status: number = 400) {
    super([], message, status);
  }
}
