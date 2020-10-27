const compareToObj = (arr, obj1, obj2) => {
  const addPlus = (value) => `+ ${value}`;
  const addMinus = (value) => `- ${value}`;
  const addSpace = (value) => ` ${value}`;
  const hasOwnProperty = (obj, value) => Object.prototype.hasOwnProperty.call(obj, value);
  return arr.reduce((acc, v) => {
    if (hasOwnProperty(obj1, v) && !hasOwnProperty(obj2, v)) {
      return { ...acc, [addMinus(v)]: obj1[v] };
    }

    if (!hasOwnProperty(obj1, v) && hasOwnProperty(obj2, v)) {
      return { ...acc, [addPlus(v)]: obj2[v] };
    }

    return (obj1[v] === obj2[v]) ? { ...acc, [addSpace(v)]: obj1[v] }
      : { ...acc, [addMinus(v)]: obj1[v], [addPlus(v)]: obj2[v] };
  }, {});
};

export default (dt1, dt2) => {
  const fileJson1 = JSON.parse(dt1);
  const fileJson2 = JSON.parse(dt2);
  const mergeObj = { ...fileJson1, ...fileJson2 };
  const sortArr = Object.keys(mergeObj).sort();
  const compareResult = compareToObj(sortArr, fileJson1, fileJson2);
  return compareResult;
};
