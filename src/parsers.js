import yaml from 'js-yaml';

export default (content, descriptor) => {
  if (descriptor === '.json') return JSON.parse(content);
  return yaml.safeLoad(content) || {};
};
