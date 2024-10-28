import { IError } from 'src/common/type/iError';
import { BaseException } from './base.exception';

export default class AppException extends BaseException {
  constructor(appErrors: IError | string = {}, message: string = 'Invalid data', status: number = 400) {
    if (typeof appErrors === 'string') {
      super([], appErrors, status);
      return;
    }
    const errorsMessages = Object.keys(appErrors).map((key) => {
      return {
        target: { key },
        property: key,
        constraints: {
          key: appErrors[key],
        },
        value: key,
      };
    });
    super(errorsMessages, message, status);
  }
}
