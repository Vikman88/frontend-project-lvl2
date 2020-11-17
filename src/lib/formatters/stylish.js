const replacer = (v) => {
  const arr = v.split('');
  if (arr[arr.length - 1] === '+' || arr[arr.length - 1] === '-') {
    const reverseArr = arr.reverse();
    const selector = reverseArr[0];
    const findIndexFirstEmptyEl = reverseArr.indexOf(' ');
    reverseArr[findIndexFirstEmptyEl + 1] = selector;
    reverseArr[0] = ':';
    const result = reverseArr.reverse().join('');
    return result;
  }
  const result = `${v}:`;
  return result;
};

export default (data) => {
  const json = JSON.stringify(data, null, 4);
  const filteredJson = json.split('').filter((v) => v !== ',' && v !== '"').join('');
  const replacedJson = filteredJson.split(':').map((v) => replacer(v)).join('');
  const result = replacedJson.substring(0, replacedJson.length - 1);
  return result;
};
