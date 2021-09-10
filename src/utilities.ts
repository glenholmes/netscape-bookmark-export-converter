import { load } from 'cheerio';
import { JsonDataTreeObject } from './interfaces';

/**
 * Uses JSON stringfily to santize undefinded and null branches
 *
 * @param obj
 * @returns
 */
export const sanitize = (obj: any) => {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      return value === null ? undefined : value;
    }),
  );
};

/**
 * Removes all null values from the nested object
 *
 * @param currentValue
 * @returns
 */
export const noNull = (currentValue: any) => {
  if (
    currentValue &&
    typeof currentValue === 'object' &&
    Array.isArray(currentValue.children)
  ) {
    currentValue.children = currentValue.children.filter(noNull);
  }
  return currentValue !== null;
};

/**
 * Reduces nested JSON object to array
 *
 * @private
 * @param obj
 * @returns
 */
export const reduceToArray = (jsonDataArray: Array<any>): any => {
  return jsonDataArray.reduce((previousValue, currentValue) => {
    if (currentValue?.url) {
      return previousValue.concat([currentValue]);
    }
    if (currentValue?.children) {
      return previousValue.concat(reduceToArray(currentValue.children));
    }
  }, []);
};

/**
 * Uses Cheerio to convert bookmark file data to a stringified JSON Object
 *
 * @function
 * @private
 * @param fileData
 * @returns
 */
export const useCheerioToConvertStringToJson = (fileData: string) => {
  try {
    const $ = load(fileData);
    const jsonDataTree: any = (
      { tagName, children = [] }: JsonDataTreeObject,
      tags: Array<string>,
    ) => {
      if (tagName === 'dt' && children[0].tagName === 'a') {
        return {
          url: children[0].attribs.href || '',
          tags,
        };
      }

      if (tagName === 'dt' && children[0].tagName === 'h3') {
        const tagText = tags.length
          ? tags.concat([children[0].children[0].data.trim()])
          : [children[0].children[0].data.trim()];
        return {
          children: children.map((child) => {
            return jsonDataTree(child, tagText);
          }),
        };
      }

      if (children.length > 1) {
        return {
          children: children.map((child) => {
            return jsonDataTree(child, tags);
          }),
        };
      }
    };

    return jsonDataTree($('body')[0], []);
  } catch (error) {
    console.log(error);
    return {};
  }
};
