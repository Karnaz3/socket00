import { Logger } from '@nestjs/common';
import { IError } from '../type/iError';

const dubplicateKey = (e: any): IError => {
  const { detail } = e;
  const regex = /Key \((.*?)\)=\((.*?)\) already exists\./g;
  const match = regex.exec(detail);
  const [, key, value] = match;
  return {
    [key]: `${value} already exists`,
  };
};

export const DbExceptionParser = (e: any): IError => {
  const { code } = e;
  switch (code as string) {
    case '23505':
      return dubplicateKey(e);
    default:
      Logger.error(e, DbExceptionParser.name);
      return {
        message: e.message,
      };
  }
};
