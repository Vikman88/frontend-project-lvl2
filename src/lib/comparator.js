import _ from 'lodash';
import parse from './parsers.js';

const mergeSortObj = (parseResult1, parseResult2) => {
  const newObj = { ...parseResult1, ...parseResult2 };
  return Object.keys(newObj).sort();
};
const isObject = (obj, v) => _.isObject(obj[v]);
const addPlus = (value) => `+ ${value}`;
const addMinus = (value) => `- ${value}`;
const addSpace = (value) => `  ${value}`;
const hasOwnProperty = (obj, value) => Object.prototype.hasOwnProperty.call(obj, value);
const createNewObject = (acc, v, obj1, obj2) => {
  if (hasOwnProperty(obj1, v) && !hasOwnProperty(obj2, v)) {
    return { ...acc, [addMinus(v)]: obj1[v] };
  }

  if (!hasOwnProperty(obj1, v) && hasOwnProperty(obj2, v)) {
    return { ...acc, [addPlus(v)]: obj2[v] };
  }

  if (isObject(obj1, v) && isObject(obj2, v)) {
    return { ...acc, [addSpace(v)]: compare(obj1[v], obj2[v]) };
  }

  return (obj1[v] === obj2[v]) ? { ...acc, [addSpace(v)]: obj1[v] }
    : { ...acc, [addMinus(v)]: obj1[v], [addPlus(v)]: obj2[v] };
};

const compareToObj = (arr, object1, object2) => arr
  .reduce((nAcc, value) => createNewObject(nAcc, value, object1, object2), {});

const compare = (data1, data2) => {
  const newSortedObj = mergeSortObj(data1, data2);
  return compareToObj(newSortedObj, data1, data2);
};

export default (filePath1, filePath2) => {
  const parseFile1 = parse(filePath1);
  const parseFile2 = parse(filePath2);
  const result = compare(parseFile1, parseFile2);
  return result;
};
