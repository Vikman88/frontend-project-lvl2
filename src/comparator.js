import _ from 'lodash';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);
  return _.sortBy(keys);
};

const compare = (data1, data2) => {
  const sortedKeys = getSortedKeys(data1, data2);
  const iter = (key) => {
    const oldValue = data1[key];
    const newValue = data2[key];

    if (_.isObject(oldValue) && _.isObject(newValue)) return { key, selector: 'node', children: compare(oldValue, newValue) };
    if (!_.has(data2, key)) return { key, selector: 'deleted', oldValue };
    if (!_.has(data1, key)) return { key, selector: 'added', newValue };
    if (oldValue === newValue) return { key, selector: 'unchanged', oldValue };
    return {
      key, selector: 'changed', oldValue, newValue,
    };
  };

  return sortedKeys.map(iter);
};

export default compare;
