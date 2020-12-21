import _ from 'lodash';

const sizeInterval = 2;
const openSymbol = '{';
const closeSymbol = '}';
const spaceSymbol = '  ';
const lineSeparator = '\n';
const symbolAdd = '+ ';
const symbolDel = '- ';
const symbolUnchange = '  ';
const colon = ': ';

export default (tree) => {
  const iter = (currentValue, depth) => {
    const deepIndentSize = depth + sizeInterval;
    const currentIndent = spaceSymbol.repeat(depth);
    const endIndent = spaceSymbol.repeat(depth - 1);

    if (!_.isObject(currentValue)) return `${currentValue}`;

    const lines = (!_.isArray(currentValue)) ? Object.entries(currentValue).map(([key, val]) => (
      `${currentIndent}${symbolUnchange}${key}${colon}${iter(val, deepIndentSize)}`
    ))
      : currentValue.map(({
        key, type, children, oldValue, newValue,
      }) => {
        switch (type) {
          case 'node':
            return `${currentIndent}${symbolUnchange}${key}${colon}${iter(children, deepIndentSize)}`;
          case 'unchanged':
            return `${currentIndent}${symbolUnchange}${key}${colon}${iter(oldValue, deepIndentSize)}`;
          case 'deleted':
            return `${currentIndent}${symbolDel}${key}${colon}${iter(oldValue, deepIndentSize)}`;
          case 'added':
            return `${currentIndent}${symbolAdd}${key}${colon}${iter(newValue, deepIndentSize)}`;
          case 'changed':
            return `${currentIndent}${symbolDel}${key}${colon}${iter(oldValue, deepIndentSize)}`
              + `${lineSeparator}${currentIndent}${symbolAdd}${key}${colon}${iter(newValue, deepIndentSize)}`;
          default:
            throw new Error(`${type} is not supported`);
        }
      });

    return [openSymbol, ...lines, `${endIndent}${closeSymbol}`].join(lineSeparator);
  };

  return iter(tree, 1);
};
