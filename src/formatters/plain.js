import _ from 'lodash';

const replaceValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return (_.isString(value)) ? `'${value}'` : value;
};

const buildStr = {
  deleted: (path) => `Property '${path}' was removed`,
  added: (path, oldValue, newValue) => `Property '${path}' was added with value: ${newValue}`,
  changed: (path, oldValue, newValue) => `Property '${path}' was updated. From ${oldValue} to ${newValue}`,
};

const makePlain = (obj) => {
  const iter = (object, path) => object.reduce((acc, {
    key, selector, children, oldValue, newValue,
  }) => {
    const newPath = [...path, key];
    if (selector === 'node') return [...acc, ...iter(children, newPath)];
    const buildPathStr = newPath.join('.');
    const replacedOldValue = replaceValue(oldValue);
    const replacedNewValue = replaceValue(newValue);
    return (selector !== 'unchanged') ? [...acc, buildStr[selector](buildPathStr, replacedOldValue, replacedNewValue)] : acc;
  }, []);
  return iter(obj, '');
};

export default (tagData) => {
  const plainResult = makePlain(tagData);
  return plainResult.join('\n');
};
