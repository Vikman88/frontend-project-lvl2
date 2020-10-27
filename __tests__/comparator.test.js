import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import comparator from '../src/lib/comparator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const fileJson1 = readFile('file1.json');
const fileJson2 = readFile('file2.json');
const fileJson3 = readFile('file3.json');
const fileJson4 = readFile('file4.json');
const expectFile = JSON.parse(readFile('expected_file.json'));
const expectFile2 = JSON.parse(readFile('expected_file2.json'));

test('test comparator', () => {
  expect(comparator(fileJson1, fileJson2)).toEqual(expectFile);
  expect(comparator(fileJson3, fileJson4)).toEqual(expectFile2);
});
