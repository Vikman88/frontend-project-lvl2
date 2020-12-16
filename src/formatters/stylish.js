import _ from 'lodash';

const convertToStylish = (tree) => {
  const sizeInterval = 4;
  const openSymbol = '{';
  const closeSymbol = '}';
  const lineSeparator = '\n';

  const iter = (currentValue, depth) => {
    const deepIndentSize = depth + sizeInterval;
    const currentIndent = ' '.repeat(depth);
    const endIndent = ' '.repeat(depth - 2);

    if (!_.isObject(currentValue)) return `${currentValue}`;

    const lines = currentValue.map(({
      key, selector, children, value, oldValue, newValue,
    }) => {
      const makeLeafNode = (val) => `${key}: ${iter(val, deepIndentSize)}`;

      const objSelectNode = {
        node: () => `${currentIndent}  ${key}: ${iter(children, deepIndentSize)}`,
        unchanged: () => `${currentIndent}  ${makeLeafNode(oldValue)}`,
        deleted: () => `${currentIndent}- ${makeLeafNode(oldValue)}`,
        added: () => `${currentIndent}+ ${makeLeafNode(newValue)}`,
        leaf: () => `${currentIndent}  ${makeLeafNode(value)}`,
        changed: () => `${currentIndent}- ${makeLeafNode(oldValue)}${lineSeparator}${currentIndent}+ ${makeLeafNode(newValue)}`,
      };
      return objSelectNode[selector]();
    });

    return [
      openSymbol,
      ...lines,
      `${endIndent}${closeSymbol}`,
    ].join(lineSeparator);
  };

  return iter(tree, 2);
};

export default (tree) => {
  const result = convertToStylish(tree);
  return result;
};
