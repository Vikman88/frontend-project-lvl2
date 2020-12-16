import _ from 'lodash';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);
  return keys.sort();
};

const getSelector = (data1, data2, key) => {
  const oldValue = data1[key];
  const newValue = data2[key];
  if (!_.has(data2, key)) return 'deleted';
  if (!_.has(data1, key)) return 'added';
  if (oldValue !== newValue) return 'changed';
  return 'unchanged';
};

const makeNestedNode = (key, selector, children) => ({
  key, selector, children,
});

const makeNode = (key, selector, oldValue, newValue) => ({
  key, selector, oldValue, newValue,
});

const makeLeafNode = (key, selector, value) => ({
  key, selector, value,
});

const getValue = (value) => {
  if (!_.isObject(value)) return value;
  return Object.entries(value).map(([key, val]) => {
    if (_.isObject(val)) return makeNestedNode(key, 'node', getValue(val));
    return makeLeafNode(key, 'leaf', val);
  });
};

const compare = (data1, data2) => {
  const sortedKeys = getSortedKeys(data1, data2);
  const iter = (node) => {
    const oldValue = data1[node];
    const newValue = data2[node];
    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return makeNestedNode(node, 'node', compare(oldValue, newValue));
    }
    const selector = getSelector(data1, data2, node);
    const repairedOldValue = getValue(oldValue);
    const repairedNewValue = getValue(newValue);
    return (selector === 'unchanged') ? makeNode(node, selector, repairedOldValue)
      : makeNode(node, selector, repairedOldValue, repairedNewValue);
  };
  return sortedKeys.map(iter);
};

export default compare;
