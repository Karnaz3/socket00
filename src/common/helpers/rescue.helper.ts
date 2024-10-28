import AppException from 'src/application/exception/app.exception';
import { DbExceptionParser } from './db-exception.parser';
import AppNotFoundException from 'src/application/exception/app-not-found.exception';

const rescue = async <T>(args: any): Promise<T> => {
  try {
    return (await args()) as T;
  } catch (e) {
    console.error(e);
    if (e instanceof AppException || e instanceof AppNotFoundException) {
      throw e;
    }
    throw new AppException(DbExceptionParser(e));
  }
};

export default rescue;
