import { readFile } from 'fs/promises';
import {
  reduceToArray,
  sanitize,
  useCheerioToConvertStringToJson,
  noNull,
} from './utilities';

/**
 * Converts Netscape Bookmark export file to an array of urls and tags
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
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error(error);
  }
};

export default convert;
