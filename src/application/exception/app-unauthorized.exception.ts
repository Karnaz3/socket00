import { BaseException } from './base.exception';

export default class AppUnauthorizedException extends BaseException {
  constructor(message: string = 'Unauthorized', status: number = 401) {
    super([], message, status);
  }
}
