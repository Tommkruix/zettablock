import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ChatInput {
  @Field()
  readonly message: string;
}