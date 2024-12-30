import { SetMetadata } from '@nestjs/common';

export const IS_USER_KEY = 'isUser';
export const User = () => SetMetadata(IS_USER_KEY, true);
