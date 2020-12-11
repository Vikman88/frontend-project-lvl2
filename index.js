import factory from './src/index.js';

export default (firstPath, secondPath, format = 'default') => {
  const result = factory(firstPath, secondPath, format);
  return result;
};
