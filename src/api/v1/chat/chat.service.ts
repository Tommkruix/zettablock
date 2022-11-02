import { Injectable } from '@nestjs/common';

import { ChatInput } from './chat.type';
import { ChatDto } from './dto/chat.dto';

import {
  CHAT_SERVICE_TAG,
  EMOTICONS_MAX_LENGTH,
  REG_EXP_ALPHANUMERIC_WITH_UNIVERSAL_CHARACTERS_ONLY,
} from '../../../constants/constants';
import {
  getEmoticon,
  getMention,
  getUrlPageTitle,
  getWordBetweenParentheses,
  isValidURL,
  sleep,
} from '../../../helpers/helpers';
import LoggerService from '../../../utils/logger';

@Injectable()
export class ChatService {
  constructor(private readonly logger: LoggerService) {}
  async findAll(): Promise<ChatDto[]> {
    return [
      {
        mentions: ['bob', 'john'],
        emoticons: ['success'],
        links: [
          {
            url: 'https://twitter.com/jdorfman/status/430511497475670016',
            title:
              'Justin Dorfman on Twitter: &quot;nice @littlebigdetail from @HipChat (shows hex colors when pasted in chat). http://t.co/7cI6Gjy5pq&quot;',
          },
        ],
      },
    ];
  }

  async create({ message }: ChatInput): Promise<ChatDto> {
    const MENTIONS = [];
    const EMOTICONS = [];
    const LINKS = [];

    try {
      const messageArray = message.split(' ');
      messageArray.forEach(async function (item: string) {
        const ITEM_WITHOUT_PARENTHESES = getWordBetweenParentheses(item);

        if (item.startsWith('@')) MENTIONS.push(getMention(item));
        if (
          ITEM_WITHOUT_PARENTHESES.length <= EMOTICONS_MAX_LENGTH &&
          ITEM_WITHOUT_PARENTHESES.length > 0 &&
          REG_EXP_ALPHANUMERIC_WITH_UNIVERSAL_CHARACTERS_ONLY.test(
            ITEM_WITHOUT_PARENTHESES,
          )
        )
          EMOTICONS.push(getEmoticon(ITEM_WITHOUT_PARENTHESES));
        if (isValidURL(item)) {
          const pageTitle = await getUrlPageTitle(item);
          LINKS.push({
            url: item,
            title: pageTitle !== undefined ? pageTitle : 'N/A',
          });
        }
      });

      /**
       * Sleep to complete request for slow networks
       */
      for (let i = 1; i <= 3; i++) {
        this.logger.verbose(`Waiting ${i * 5} seconds to complete request...`);
        await sleep(i * 5000);
        if (i === 3) this.logger.verbose(`Request completed.`);
      }

      const result = {
        mentions: MENTIONS,
        emoticons: EMOTICONS,
        links: LINKS,
      };

      return result;
    } catch (error) {
      this.logger.error(`${CHAT_SERVICE_TAG}: ${error}`);
    }
  }
}
