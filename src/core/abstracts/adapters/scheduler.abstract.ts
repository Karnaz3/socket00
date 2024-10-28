export abstract class IEventSchedulerService {
  abstract handleCron(): Promise<void>;
}
