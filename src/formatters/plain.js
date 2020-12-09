import _ from 'lodash';

const replaceValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return (_.isString(value)) ? `'${value}'` : value;
};

const buildStr = {
  deleted: (path) => `Property '${path}' was removed`,
  added: (path, value, newValue) => `Property '${path}' was added with value: ${newValue}`,
  updated: (path, value, newValue) => `Property '${path}' was updated. From ${value} to ${newValue}`,
};

const makePlain = (obj) => {
  const iter = (object, path) => object.reduce((acc, {
    key, selector, value, newValue,
  }) => {
    const newPath = [...path, key];
    if (selector === 'node') return [...acc, ...iter(value, newPath)];
    if (selector === 'leaf') return acc;
    const buildPathStr = newPath.join('.');
    const replacedValue = replaceValue(value);
    const replacedNewValue = replaceValue(newValue);
    return [...acc, buildStr[selector](buildPathStr, replacedValue, replacedNewValue)];
  }, []);
  return iter(obj, '');
};

export default (tagData) => {
  const plainResult = makePlain(tagData);
  return plainResult.join('\n');
};
