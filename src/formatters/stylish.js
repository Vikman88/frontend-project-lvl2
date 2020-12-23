import _ from 'lodash';

const sizeInterval = 4;
const sizePrefix = 2;
const openSymbol = '{';
const closeSymbol = '}';
const spaceSymbol = ' ';
const lineSeparator = '\n';
const symbolAdd = '+ ';
const symbolDel = '- ';
const colon = ': ';

const getIndent = (depth) => {
  const currentSize = depth * sizeInterval;
  return {
    currentIndent: spaceSymbol.repeat(currentSize),
    prefixIndent: spaceSymbol.repeat(currentSize - sizePrefix),
    endIndent: spaceSymbol.repeat(currentSize - sizeInterval),
  };
};

const convertToStr = (value, size) => {
  const { currentIndent } = getIndent(size);
  const { endIndent } = getIndent(size);
  if (!_.isObject(value)) return `${value}`;
  const str = Object.entries(value).map(([key, val]) => (
    `${currentIndent}${key}${colon}${convertToStr(val, size + 1)}`
  ));
  return [openSymbol, ...str, `${endIndent}${closeSymbol}`].join(lineSeparator);
};

export default (tree) => {
  const iter = (currentValue, depth) => {
    const { currentIndent, prefixIndent, endIndent } = getIndent(depth);

    const lines = currentValue.map(({
      key, type, children, oldValue, newValue,
    }) => {
      const convertedOldValue = convertToStr(oldValue, depth + 1);
      const convertedNewVal = convertToStr(newValue, depth + 1);

      switch (type) {
        case 'node':
          return `${currentIndent}${key}${colon}${iter(children, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}${key}${colon}${convertedOldValue}`;
        case 'deleted':
          return `${prefixIndent}${symbolDel}${key}${colon}${convertedOldValue}`;
        case 'added':
          return `${prefixIndent}${symbolAdd}${key}${colon}${convertedNewVal}`;
        case 'changed':
          return `${prefixIndent}${symbolDel}${key}${colon}${convertedOldValue}`
            + `${lineSeparator}${prefixIndent}${symbolAdd}${key}${colon}${convertedNewVal}`;
        default:
          throw new Error(`${type} is not supported`);
      }
    });

    return [openSymbol, ...lines, `${endIndent}${closeSymbol}`].join(lineSeparator);
  };

  return iter(tree, 1);
};
