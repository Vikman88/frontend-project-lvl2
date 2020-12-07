import path from 'path';
import comparator from './src/lib/comparator.js';

export default (firstPath, secondPath, format) => {
  const filePath1 = path.resolve(process.cwd(), firstPath);
  const filePath2 = path.resolve(process.cwd(), secondPath);
  const result = comparator(filePath1, filePath2, format);
  return result;
};