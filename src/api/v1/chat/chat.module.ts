import { Module } from '@nestjs/common';

import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

import LoggerService from '../../../utils/logger';

@Module({
  providers: [ChatService, ChatController, LoggerService],
})
export class ChatModule {}
