/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { readFile } from 'fs/promises';
import {
  reduceToArray,
  sanitize,
  useCheerioToConvertStringToJson,
  noNull,
} from './utilities';

/**
 * Converts Netscape Bookmark export file to an array of URIs and Tags
 *
 * @function
 * @public
 * @param fileName
 * @returns
 */
const convert = async (fileName: string) => {
  try {
    const fileData = await readFile(fileName, 'utf8');
    const jsonData = reduceToArray(
      [sanitize(useCheerioToConvertStringToJson(fileData))].filter(noNull),
    );
    return jsonData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default convert;
