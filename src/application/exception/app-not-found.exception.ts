import { BaseException } from './base.exception';

export default class AppNotFoundException extends BaseException {
  constructor(message: string = 'Not Found', status: number = 404) {
    super([], message, status);
  }
}
