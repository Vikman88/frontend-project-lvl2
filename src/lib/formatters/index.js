import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (tagData, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tagData);
    case 'plain':
      return plain(tagData);
    case 'json':
      return json(tagData);
    default:
      return stylish(tagData);
  }
};
