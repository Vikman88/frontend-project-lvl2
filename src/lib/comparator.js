import _ from 'lodash';
import parse from './parsers.js';
import formatter from './formatters/index.js';

const mergeSortObj = (parseResult1, parseResult2) => {
  const newObj = { ...parseResult1, ...parseResult2 };
  return Object.keys(newObj).sort();
};

const isObject = (obj, v) => _.isObject(obj[v]);

const hasOwnProperty = (obj, value) => Object.prototype.hasOwnProperty.call(obj, value);

const getValue = (data, value) => (isObject(data, value)
  ? compare(data[value], data[value]) : data[value]);

const makeNode = (status, value, data1, data2) => {
  const valueFirstFile = getValue(data1, value);
  const valueSecondFile = getValue(data2, value);
  if (status === 'deleted' || status === 'leaf') return { 'name': value, status, 'value': valueFirstFile };
  if (status === 'added') return { 'name': value, status, 'value': valueSecondFile };
  return { 'name': value, status, 'value': { 'before': valueFirstFile, 'after': valueSecondFile } };
};

const createNewObject = (acc, v, obj1, obj2) => {
  if (hasOwnProperty(obj1, v) && !hasOwnProperty(obj2, v)) {
    return [...acc, makeNode('deleted', v, obj1, obj2)];
  }

  if (!hasOwnProperty(obj1, v) && hasOwnProperty(obj2, v)) {
    return [...acc, makeNode('added', v, obj1, obj2)];
  }

  if (isObject(obj1, v) && isObject(obj2, v)) {
    return [...acc, { 'name': v, 'status': 'node', 'children': compare(obj1[v], obj2[v]) }];
  }

  return (obj1[v] === obj2[v]) ? [...acc, makeNode('leaf', v, obj1, obj2)]
    : [...acc, makeNode('updated', v, obj1, obj2)];
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
  return formatter(result, format, parseFile1, parseFile2);
};
