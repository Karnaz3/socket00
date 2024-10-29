import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { ChatFactoryService } from './chat-factory.usecase.service';

@Injectable()
export class ChatUseCaseService {
  constructor(
    private readonly chatFactoryService: ChatFactoryService,
    private readonly dataService: IDataServices,
  ) {}
}
