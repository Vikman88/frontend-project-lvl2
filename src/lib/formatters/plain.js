import _ from 'lodash';

const createGraphs = (obj) => {
  const result = [];
  const iter = (tree, str) => tree.reduce((acc, { name, status, children }) => {
    const newAcc = (str === '') ? `${name}` : `${str}.${name}`;
    if (status === 'node') return `${newAcc}.${iter(children, newAcc)}`;
    result.push(`${newAcc}:${status}`);
    return acc;
  }, str);
  iter(obj, '');
  return result;
};

const filterGraphs = (arr) => arr.filter((v) => !v.includes('leaf'));

const replaceGraphs = (arr) => arr.map((v) => {
  const [path, status] = v.split(':');
  return [path, status];
});

const getValue = (key, data) => {
  const value = _.get(data, key, 'empty');
  const refinedVaue = (_.isObject(value)) ? '[complex value]' : value;
  if (refinedVaue === '[complex value]') return refinedVaue;
  return (_.isString(refinedVaue)) ? `'${refinedVaue}'` : refinedVaue;
};

const makePlainDiff = (paths, data1, data2) => paths.reduce((acc, [path, status]) => {
  if (status === 'added') {
    const value = getValue(path, data2);
    return [...acc, `Property '${path}' was added with value: ${value}`];
  }
  if (status === 'deleted') return [...acc, `Property '${path}' was removed`];
  const valueOld = getValue(path, data1);
  const valueNew = getValue(path, data2);
  return [...acc, `Property '${path}' was updated. From ${valueOld} to ${valueNew}`];
}, []);

export default (tagData, fileData1, fileData2) => {
  const graphs = createGraphs(tagData);
  const filteredGraphs = filterGraphs(graphs);
  const replacedGraphs = replaceGraphs(filteredGraphs);
  const plainDiff = makePlainDiff(replacedGraphs, fileData1, fileData2);
  return plainDiff.join('\n');
};
