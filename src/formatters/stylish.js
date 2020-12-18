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
    if (!_.isArray(currentValue)) {
      const newLinesFromValue = Object.entries(currentValue).map(([key, val]) => (
        `\n${currentIndent}  ${key}: ${iter(val, deepIndentSize)}`
      )).join('');
      return `${openSymbol}${newLinesFromValue}${lineSeparator}${endIndent}${closeSymbol}`;
    }
    const lines = currentValue.map(({
      key, selector, children, oldValue, newValue,
    }) => {
      const objSelectNode = {
        node: () => `${currentIndent}  ${key}: ${iter(children, deepIndentSize)}`,
        unchanged: () => `${currentIndent}  ${key}: ${iter(oldValue, deepIndentSize)}`,
        deleted: () => `${currentIndent}- ${key}: ${iter(oldValue, deepIndentSize)}`,
        added: () => `${currentIndent}+ ${key}: ${iter(newValue, deepIndentSize)}`,
        changed: () => `${currentIndent}- ${key}: ${iter(oldValue, deepIndentSize)}`
          + `${lineSeparator}${currentIndent}+ ${key}: ${iter(newValue, deepIndentSize)}`,
      };
      return objSelectNode[selector]();
    });

    return [openSymbol, ...lines, `${endIndent}${closeSymbol}`].join(lineSeparator);
  };

  return iter(tree, 2);
};

export default (tree) => {
  const result = convertToStylish(tree);
  return result;
};
