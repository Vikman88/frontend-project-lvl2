import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect, describe } from '@jest/globals';
import gendiff from '..';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (pathFile) => fs.readFileSync(getFixturePath(pathFile)).toString().trim();
const formats = ['stylish', 'plain', 'json', 'default'];
const extensionFile = [['json', 'json'], ['yml', 'yml'], ['json', 'yml']];

describe.each(formats)('test %s format', (format) => {
  const nameFile = `expected_${format}.txt`;
  const expectedValue = readFile(nameFile);

  test.each(extensionFile)('%s + %s', (extFirst, extSecond) => {
    const nameFirstFile = `file1.${extFirst}`;
    const nameSecondFile = `file2.${extSecond}`;
    const dataFirst = getFixturePath(nameFirstFile);
    const dataSecond = getFixturePath(nameSecondFile);
    const receivedValue = (format === 'default') ? gendiff(dataFirst, dataSecond)
      : gendiff(dataFirst, dataSecond, `${format}`);
    expect(receivedValue).toEqual(expectedValue);
  });
});
