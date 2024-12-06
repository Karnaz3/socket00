export type RedisPubSubBaseData<T = any> = {
  data: T;
  eventName: string;
  sockets?: string[];
};

export type RedisPubSubBaseDataWithEventId<T = any> = {
  data: T;
  eventName: string;
};
