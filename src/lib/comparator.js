import _ from 'lodash';
import parse from './parsers.js';
import formatter from './formatters/index.js';

const mergeSortObj = (parseResult1, parseResult2) => {
  const newObj = { ...parseResult1, ...parseResult2 };
  return Object.keys(newObj).sort();
};
const isObject = (obj, v) => _.isObject(obj[v]);
const addPlus = (value) => `${value}+`;
const addMinus = (value) => `${value}-`;
const hasOwnProperty = (obj, value) => Object.prototype.hasOwnProperty.call(obj, value);
const makeNode = (status, value, data1, data2) => {
  if (status === "deleted") return { "name": value, status, "value": data1[value] };
  if (status === "added") return { "name": value, status, "value": data2[value] };
  if (status === "leaf") return { "name": value, status, "value": data1[value] };
  return { "name": value, status, "value": { "before": data1[value], "after": data2[value] }};
};

const createNewObject = (acc, v, obj1, obj2) => {
  if (hasOwnProperty(obj1, v) && !hasOwnProperty(obj2, v)) {
    return [...acc, makeNode("deleted", v, obj1, obj2)];
  }

  if (!hasOwnProperty(obj1, v) && hasOwnProperty(obj2, v)) {
    return [...acc, makeNode("added", v, obj1, obj2)];
  }

  if (isObject(obj1, v) && isObject(obj2, v)) {
    return [...acc, { "name": v, "status": "node", "children": compare(obj1[v], obj2[v]) }];
  }

  return (obj1[v] === obj2[v]) ? [...acc, makeNode("leaf", v, obj1, obj2)]
    : [...acc, makeNode("updated", v, obj1, obj2)];
};

const compareToObj = (arr, object1, object2) => arr
  .reduce((nAcc, value) => createNewObject(nAcc, value, object1, object2), []);

const compare = (data1, data2) => {
  const newSortedObj = mergeSortObj(data1, data2);
  return compareToObj(newSortedObj, data1, data2);
};

export default (filePath1, filePath2, format) => {
  const parseFile1 = parse(filePath1);
  const parseFile2 = parse(filePath2);
  const result = compare(parseFile1, parseFile2);
  console.log(JSON.stringify(result, null, 2));
  return formatter(result, format, parseFile1, parseFile2);
};
