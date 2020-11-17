import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (tagData, format, fileData1, fileData2) => {
  switch (format) {
    case 'stylish':
      return stylish(tagData);
    case 'plain':
      return plain(tagData, fileData1, fileData2);
    case 'json':
      return json(tagData);
    default:
      return stylish(tagData);
  }
};
