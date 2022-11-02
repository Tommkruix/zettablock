import { ChatDto } from '../src/api/v1/chat/dto/chat.dto';
import { ChatInput } from '../src/api/v1/chat/chat.type';

import { createQueryObject } from '../src/helpers/helpers';

const CHAT_INPUT_MENTION_ONLY: ChatInput = {
  message: '@chris you around?',
};

const CHAT_INPUT_EMOTICON_ONLY: ChatInput = {
  message: 'Good morning! (megusta) (coffee)',
};

const CHAT_INPUT_LINK_ONLY: ChatInput = {
  message: 'Olympics are starting soon; http://www.nbcolympics.com',
};

const CHAT_INPUT_MENTION_EMOTICON_LINK: ChatInput = {
  message:
    '@bob @john (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016',
};

const CHAT_RESPONSE_MENTION_ONLY: ChatDto = {
  mentions: ['chris'],
};

const CHAT_RESPONSE_EMOTICON_ONLY: ChatDto = {
  emoticons: ['megusta', 'coffee'],
};

const CHAT_RESPONSE_LINK_ONLY: ChatDto = {
  links: [
    {
      url: 'http://www.nbcolympics.com',
      title: 'Paris 2024 Olympic Games | NBC Olympics',
    },
  ],
};
const CHAT_RESPONSE_MENTION_EMOTICON_LINK: ChatDto = {
  mentions: ['bob', 'john'],
  links: [
    {
      url: 'https://twitter.com/jdorfman/status/430511497475670016',
      title:
        'Justin Dorfman on Twitter: "nice @littlebigdetail from @HipChat (shows hex colors when pasted in chat). http://t.co/7cI6Gjy5pq" / Twitter',
    },
  ],
  emoticons: ['success'],
};

const CREATE_CHAT_MENTION_ONLY_QUERY = `
      mutation {
        createChat(chatInput: ${createQueryObject(CHAT_INPUT_MENTION_ONLY)}) {
          mentions
        }
      }`;

const CREATE_CHAT_EMOTICON_ONLY_QUERY = `
      mutation {
        createChat(chatInput: ${createQueryObject(CHAT_INPUT_EMOTICON_ONLY)}) {
          emoticons
        }
      }`;

const CREATE_CHAT_LINK_ONLY_QUERY = `
      mutation {
        createChat(chatInput: ${createQueryObject(CHAT_INPUT_LINK_ONLY)}) {
          links {
            url
            title
          }
        }
      }`;

const CREATE_CHAT_MENTION_EMOTICON_LINK_QUERY = `
      mutation {
        createChat(chatInput: ${createQueryObject(
          CHAT_INPUT_MENTION_EMOTICON_LINK,
        )}) {
          mentions
          links {
            url
            title
          }
          emoticons
        }
      }`;

export {
  CREATE_CHAT_MENTION_ONLY_QUERY,
  CREATE_CHAT_EMOTICON_ONLY_QUERY,
  CREATE_CHAT_LINK_ONLY_QUERY,
  CREATE_CHAT_MENTION_EMOTICON_LINK_QUERY,
  CHAT_RESPONSE_EMOTICON_ONLY,
  CHAT_RESPONSE_MENTION_ONLY,
  CHAT_RESPONSE_LINK_ONLY,
  CHAT_RESPONSE_MENTION_EMOTICON_LINK,
};
