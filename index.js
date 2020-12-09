import comparator from './src/comparator.js';

export default (firstPath, secondPath, format) => {
  const result = comparator(firstPath, secondPath, format);
  return result;
};
