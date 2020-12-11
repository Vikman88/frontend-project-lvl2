import _ from 'lodash';

const node = 'node';
const leaf = 'leaf';
const deleted = 'deleted';
const added = 'added';
const updated = 'updated';

const mergeSortObj = (parseData1, parseData2) => {
  const newMergeObj = { ...parseData1, ...parseData2 };
  return Object.keys(newMergeObj).sort();
};

const compareValue = (value, newValue) => {
  if (_.isObject(value) && _.isObject(newValue)) return node;
  if (_.isUndefined(newValue)) return deleted;
  if (_.isUndefined(value)) return added;
  if (value === newValue) return leaf;
  return updated;
};

const makeNode = (key, selector, value, newValue) => ({
  key, selector, value, newValue,
});

const selectNode = {
  [node]: (key, value, newValue) => makeNode(key, node, compare(value, newValue)),
  [leaf]: (key, value) => makeNode(key, leaf, value),
  [deleted]: (key, value) => makeNode(key, deleted, value),
  [added]: (key, value, newValue) => makeNode(key, added, value, newValue),
  [updated]: (key, value, newValue) => makeNode(key, updated, value, newValue),
};

const makeAST = (acc, key, obj1, obj2) => {
  const value = obj1[key];
  const newValue = obj2[key];
  const selector = compareValue(value, newValue);
  const buildingNode = selectNode[selector](key, value, newValue);
  return [...acc, buildingNode];
};

const compare = (data1, data2) => {
  const sortedKeys = mergeSortObj(data1, data2);
  const ast = sortedKeys
    .reduce((acc, value) => makeAST(acc, value, data1, data2), []);
  return ast;
};

export default compare;
