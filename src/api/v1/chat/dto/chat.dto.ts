import { Optional } from '@nestjs/common';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ChatDto {
  @Field(() => [String], { nullable: true })
  @Optional()
  readonly mentions?: string[];

  @Field(() => [String], { nullable: true })
  @Optional()
  readonly emoticons?: string[];

  @Field(() => [LinksDto], { nullable: true })
  @Optional()
  readonly links?: LinksDto[];
}

@ObjectType()
class LinksDto {
  @Field(() => String, { nullable: true })
  @Optional()
  readonly url?: string;

  @Field(() => String, { nullable: true })
  @Optional()
  readonly title?: string;
}
