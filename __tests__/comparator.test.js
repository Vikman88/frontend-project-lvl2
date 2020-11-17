import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect, describe } from '@jest/globals';
import comparator from '../src/lib/comparator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename)).toString().trim();
const fixCntrlCharacter = (value) => value.replace(/\n/gi, '\r\n');
const getResult = (value1, value2, format) => fixCntrlCharacter(comparator(value1, value2, format));
const fileJson1 = getFixturePath('file1.json');
const fileJson2 = getFixturePath('file2.json');
const fileYml1 = getFixturePath('file1.yml');
const fileYml2 = getFixturePath('file2.yml');
const expectedStylish = readFile('expected_stylish.txt');
const expectedPlain = readFile('expected_plain.txt');
const expectedJson = readFile('expected_json.txt');

describe('test comparator stylish', () => {
  test('fileJson', () => {
    expect(getResult(fileJson1, fileJson2, 'stylish')).toBe(expectedStylish);
  });

  test('fileYml', () => {
    expect(getResult(fileYml1, fileYml2, 'stylish')).toBe(expectedStylish);
  });

  test('yml + json', () => {
    expect(getResult(fileJson1, fileYml2, 'stylish')).toBe(expectedStylish);
  });
});

describe('test comparator plain', () => {
  test('fileJson', () => {
    expect(getResult(fileJson1, fileJson2, 'plain')).toBe(expectedPlain);
  });

  test('fileYml', () => {
    expect(getResult(fileYml1, fileYml2, 'plain')).toBe(expectedPlain);
  });

  test('yml + json', () => {
    expect(getResult(fileJson1, fileYml2, 'plain')).toBe(expectedPlain);
  });
});

describe('test comparator json', () => {
  test('fileJson', () => {
    expect(getResult(fileJson1, fileJson2, 'json')).toBe(expectedJson);
  });

  test('fileYml', () => {
    expect(getResult(fileYml1, fileYml2, 'json')).toBe(expectedJson);
  });

  test('yml + json', () => {
    expect(getResult(fileJson1, fileYml2, 'json')).toBe(expectedJson);
  });
});
