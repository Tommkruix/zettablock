import * as playwright from '@playwright/test';

import LoggerService from '../utils/logger';

const logger = new LoggerService();

export const getMention = (mention: string): string => {
  return mention.substring(1);
};

export const getEmoticon = (emoticon: string): string => {
  return emoticon;
};

export const getWordBetweenParentheses = (word: string): string => {
  const OPENINIG_PARENTHESES_INDEX = word.indexOf('(');
  const CLOSING_PARENTHESES_INDEX = word.indexOf(')') + 1;
  return word.substring(
    OPENINIG_PARENTHESES_INDEX + 1,
    CLOSING_PARENTHESES_INDEX - OPENINIG_PARENTHESES_INDEX - 1,
  );
};

export const isValidURL = (url: string): boolean => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(url);
};

export const getUrlPageTitle = async (url: string): Promise<string> => {
  try {
    return await parseUrlTitle(url);
  } catch (error) {
    logger.warn(`getUrlPageTitle: ${error}`);
  }
};

export const parseUrlTitle = async (url: string): Promise<string> => {
  try {
    const browser = await playwright['firefox'].launch();
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'load',
    });

    /**
     * Screenshot to check if the page loaded (For Debugging purpose)
     * NOTE: The screenshot is available at the root folder with filename: webpage.png
     */
    await page.screenshot({ path: 'webpage.png' });

    const title = await page.evaluate(() => {
      return document.title;
    });

    await browser.close();

    return title;
  } catch (error) {
    logger.warn(`parseUrlTitle: ${error}`);
  }
};

export const sleep = (ms: number): Promise<unknown> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const createQueryObject = (object: unknown): string =>
  JSON.stringify(object).replace(/\"([^(\")"]+)\":/g, '$1:');
