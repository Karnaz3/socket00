import { SetMetadata } from '@nestjs/common';

export const IS_EVENT_USER_KEY = 'isEventUser';
export const EventUser = () => SetMetadata(IS_EVENT_USER_KEY, true);
