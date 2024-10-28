import { SetMetadata } from '@nestjs/common';

export const IS_EVENT_ADMIN_KEY = 'isEventAdmin';
export const EventAdmin = () => SetMetadata(IS_EVENT_ADMIN_KEY, true);
