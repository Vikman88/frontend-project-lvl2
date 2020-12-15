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

const compare = (data1, data2) => {
  const sortedKeys = getSortedKeys(data1, data2);
  const iter = (node) => {
    const oldValue = data1[node];
    const newValue = data2[node];
    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return makeNestedNode(node, 'node', compare(oldValue, newValue));
    }
    const selector = getSelector(data1, data2, node);
    return (selector === 'unchanged') ? makeNode(node, selector, oldValue)
      : makeNode(node, selector, oldValue, newValue);
  };
  return sortedKeys.map(iter);
};

export default compare;
