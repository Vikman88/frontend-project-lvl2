import yaml from 'js-yaml';

export default (content, format) => {
  if (format === 'json') return JSON.parse(content);
  if (format === 'yml' || format === 'yaml') return yaml.safeLoad(content) || {};
  throw new Error(`[${format}] file format is not supported`);
};
