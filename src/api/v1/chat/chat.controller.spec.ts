import { Test, TestingModule } from '@nestjs/testing';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

import LoggerService from '../../../utils/logger';

describe('ChatController', () => {
  let resolver: ChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatController, ChatService, LoggerService],
    }).compile();

    resolver = module.get<ChatController>(ChatController);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
