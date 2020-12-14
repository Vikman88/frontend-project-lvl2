import parse from './parsers.js';
import formatter from './formatters/index.js';
import compare from './comparator.js';

export default (pathFile1, pathFile2, format) => {
  // Get content and parse it.
  const content1 = parse(pathFile1);
  const content2 = parse(pathFile2);

  // Compare contents and make AST.
  const ast = compare(content1, content2);

  // Сonvert to output format.
  const result = formatter(ast, format);

  // Return formatted data.
  return result;
};
