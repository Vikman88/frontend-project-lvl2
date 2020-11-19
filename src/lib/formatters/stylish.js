import _ from 'lodash';

const isObject = (value) => _.isObject(value);
const addNode = (name, selector, value) => [name, selector, value];

const convertToArr = (tree) => tree.reduce((acc, {
  name, status, children, value,
}) => {
  if (status === 'node') return [...acc, addNode(name, '', convertToArr(children))];
  if (status === 'updated') {
    const getValueBefore = isObject(value.before) ? convertToArr(value.before) : value.before;
    const getValueAfter = isObject(value.after) ? convertToArr(value.after) : value.after;
    return [...acc, addNode(name, '- ', getValueBefore), addNode(name, '+ ', getValueAfter)];
  }
  const getValue = isObject(value) ? convertToArr(value) : value;
  if (status === 'added') return [...acc, addNode(name, '+ ', getValue)];
  if (status === 'deleted') return [...acc, addNode(name, '- ', getValue)];
  return [...acc, addNode(name, '', getValue)];
}, []);

const convertToStr = (tree) => {
  const iter = (node, spaceCount) => node.reduce((acc, [name, selector, children]) => {
    const tab = ' '.repeat(spaceCount);
    if (!_.isObject(children)) {
      const addLeafNode = `\n${tab}${selector}${name}: ${children}`;
      return acc + addLeafNode;
    }
    const addChildrenNode = `\n${tab}${selector}${name}: {${iter(children, spaceCount + 4)}\n${tab}}`;
    return acc + addChildrenNode;
  }, '');
  return iter(tree, 4);
};

export default (tree) => {
  const arrTree = convertToArr(tree);
  const strTree = convertToStr(arrTree);
  const arrSplit = strTree.split('\n');
  const result = arrSplit.map((v) => {
    if (v.includes('+ ')) return v.slice(2);
    if (v.includes('- ')) return v.slice(2);
    return v;
  });
  return `{${result.join('\n')}\n}`;
};
