import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { ChatDto } from '../src/api/v1/chat/dto/chat.dto';

import * as SAMPLE_DATA from './data.sample';
import { GQL } from '../src/constants/constants';

jest.setTimeout(100000);

describe('ChatController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  // afterAll(async () => {
  //   await app.close();
  // });

  it(`It should return mention only: ${JSON.stringify(
    SAMPLE_DATA.CHAT_RESPONSE_MENTION_ONLY,
  )}`, () => {
    return request(app.getHttpServer())
      .post(GQL)
      .send({
        operationName: null,
        query: SAMPLE_DATA.CREATE_CHAT_MENTION_ONLY_QUERY,
      })
      .expect(({ body }) => {
        const data: ChatDto = body.data.createChat;
        expect(JSON.stringify(data)).toBe(
          JSON.stringify(SAMPLE_DATA.CHAT_RESPONSE_MENTION_ONLY),
        );
      })
      .expect(200);
  });

  it(`It should return emoticon only: ${JSON.stringify(
    SAMPLE_DATA.CHAT_RESPONSE_EMOTICON_ONLY,
  )}`, () => {
    return request(app.getHttpServer())
      .post(GQL)
      .send({
        operationName: null,
        query: SAMPLE_DATA.CREATE_CHAT_EMOTICON_ONLY_QUERY,
      })
      .expect(({ body }) => {
        const data: ChatDto = body.data.createChat;
        expect(JSON.stringify(data)).toBe(
          JSON.stringify(SAMPLE_DATA.CHAT_RESPONSE_EMOTICON_ONLY),
        );
      })
      .expect(200);
  });

  it(`It should return link only: ${JSON.stringify(
    SAMPLE_DATA.CHAT_RESPONSE_LINK_ONLY,
  )}`, () => {
    return request(app.getHttpServer())
      .post(GQL)
      .send({
        operationName: null,
        query: SAMPLE_DATA.CREATE_CHAT_LINK_ONLY_QUERY,
      })
      .expect(({ body }) => {
        const data: ChatDto = body.data.createChat;
        expect(JSON.stringify(data)).toBe(
          JSON.stringify(SAMPLE_DATA.CHAT_RESPONSE_LINK_ONLY),
        );
      })
      .expect(200);
  });

  it(`It should return mention, emoticon and link: ${JSON.stringify(
    SAMPLE_DATA.CHAT_RESPONSE_MENTION_EMOTICON_LINK,
  )}`, () => {
    return request(app.getHttpServer())
      .post(GQL)
      .send({
        operationName: null,
        query: SAMPLE_DATA.CREATE_CHAT_MENTION_EMOTICON_LINK_QUERY,
      })
      .expect(({ body }) => {
        const data: ChatDto = body.data.createChat;
        expect(JSON.stringify(data)).toBe(
          JSON.stringify(SAMPLE_DATA.CHAT_RESPONSE_MENTION_EMOTICON_LINK),
        );
      })
      .expect(200);
  });
});
