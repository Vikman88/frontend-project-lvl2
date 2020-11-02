import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

export default (pathFile) => {
  const data = fs.readFileSync(pathFile, 'utf-8');
  const format = path.extname(pathFile);
  if (format === '.json') return JSON.parse(data);
  return yaml.safeLoad(data) || {};
};
