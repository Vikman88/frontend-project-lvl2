import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import formatter from './formatters/index.js';
import compare from './comparator.js';

const collectPath = (pathFile) => path.resolve(process.cwd(), pathFile);
const readFile = (pathFile) => fs.readFileSync(collectPath(pathFile), 'utf-8').toString();
const getDescriptor = (pathFile) => path.extname(collectPath(pathFile)).substring(1);

export default (pathFile1, pathFile2, format) => {
  // Get content.
  const data1 = readFile(pathFile1);
  const data2 = readFile(pathFile2);
  const descriptor1 = getDescriptor(pathFile1);
  const descriptor2 = getDescriptor(pathFile2);

  // Parse it.
  const content1 = parse(data1, descriptor1);
  const content2 = parse(data2, descriptor2);

  // Compare contents and make AST.
  const ast = compare(content1, content2);

  // Сonvert to output format.
  const result = formatter(ast, format);

  // Return formatted data.
  return result;
};
