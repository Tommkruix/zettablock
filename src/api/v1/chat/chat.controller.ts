import { Controller, Version } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { ChatInput } from './chat.type';
import { ChatDto } from './dto/chat.dto';

@Controller({
  version: 'v1',
})
@Resolver(() => ChatDto)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Version('v1')
  @Query(() => [ChatDto])
  async getChats(): Promise<ChatDto[]> {
    return this.chatService.findAll();
  }

  @Version('v1')
  @Mutation(() => ChatDto)
  async createChat(@Args('chatInput') chatInput: ChatInput): Promise<ChatDto> {
    const response = await this.chatService.create(chatInput);
    return response;
  }
}
