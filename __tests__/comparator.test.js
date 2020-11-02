import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { test, expect, describe } from '@jest/globals';
import comparator from '../src/lib/comparator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const fileJson1 = getFixturePath('file1.json');
const fileJson2 = getFixturePath('file2.json');
const fileJson3 = getFixturePath('file3.json');
const fileJson4 = getFixturePath('file4.json');
const fileYml1 = getFixturePath('file1.yml');
const fileYml2 = getFixturePath('file2.yml');
const fileYml3 = getFixturePath('file3.yml');
const fileYml4 = getFixturePath('file4.yml');
const expectFile = JSON.parse(readFile('expected_file.json'));
const expectFile2 = JSON.parse(readFile('expected_file2.json'));
const expectFile3 = yaml.safeLoad(readFile('expected_file1.yml'));
const expectFile4 = yaml.safeLoad(readFile('expected_file2.yml'));
const expectFile5 = JSON.parse(readFile('expected_file3.json'));

describe('test comparator', () => {
  test('fileJson', () => {
    expect(comparator(fileJson1, fileJson2)).toEqual(expectFile);
    expect(comparator(fileJson3, fileJson4)).toEqual(expectFile2);
  });

  test('fileYml', () => {
    expect(comparator(fileYml1, fileYml2)).toEqual(expectFile3);
    expect(comparator(fileYml3, fileYml4)).toEqual(expectFile4);
  });

  test('yml + json', () => {
    expect(comparator(fileJson1, fileYml2)).toEqual(expectFile5);
  });
});
