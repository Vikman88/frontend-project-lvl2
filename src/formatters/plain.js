import _ from 'lodash';

const convertToStr = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return (_.isString(value)) ? `'${value}'` : value;
};

export default (obj) => {
  const iter = (object, path) => object.flatMap(({
    key, type, children, oldValue, newValue,
  }) => {
    const newPath = [...path, key];
    if (type === 'node') return iter(children, newPath);
    const buildPathStr = newPath.join('.');
    const convertedOldValue = convertToStr(oldValue);
    const convertedNewValue = convertToStr(newValue);
    switch (type) {
      case 'deleted':
        return `Property '${buildPathStr}' was removed`;
      case 'added':
        return `Property '${buildPathStr}' was added with value: ${convertedNewValue}`;
      case 'changed':
        return `Property '${buildPathStr}' was updated. From ${convertedOldValue} to ${convertedNewValue}`;
      case 'unchanged':
        return null;
      default:
        throw new Error(`${type} is not supported`);
    }
  });
  return iter(obj, '').filter(Boolean).join('\n');
};
