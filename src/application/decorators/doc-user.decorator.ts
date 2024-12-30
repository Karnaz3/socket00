import { SetMetadata } from '@nestjs/common';

export const IS_DOC_KEY = 'isDoc';
export const Doc = () => SetMetadata(IS_DOC_KEY, true);
