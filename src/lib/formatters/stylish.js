import _ from 'lodash';

const makeSpaces = (countSpace) => `\n${' '.repeat(countSpace)}`;

const getValue = (value, count) => {
  if (_.isObject(value)) {
    const expandedValue = Object.keys(value).map((v) => `${makeSpaces(count + 4)}  ${v}: ${getValue(value[v], count + 4)}`);
    return `{${expandedValue}${makeSpaces(count + 2)}}`;
  }
  return value;
};

const convertToStylish = (tree, count = 2) => tree.map(({
  key, selector, value, newValue,
}) => {
  const makeLeafNode = (val) => `${key}: ${getValue(val, count)}`;

  const objSelectNode = {
    node: () => `${makeSpaces(count)}  ${key}: {${convertToStylish(value, count + 4)}${makeSpaces(count + 2)}}`,
    leaf: () => `${makeSpaces(count)}  ${makeLeafNode(value)}`,
    deleted: () => `${makeSpaces(count)}- ${makeLeafNode(value)}`,
    added: () => `${makeSpaces(count)}+ ${makeLeafNode(newValue)}`,
    updated: () => `${makeSpaces(count)}- ${makeLeafNode(value)}${makeSpaces(count)}+ ${makeLeafNode(newValue)}`,
  };
  return objSelectNode[selector]();
});

export default (tree) => {
  const result = convertToStylish(tree);
  const fixedResult = result.map((v) => v.slice(1, v.length).replace(/,/gi, ''));
  return `{\n${fixedResult.join('\n')}\n}`;
};
