import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

export default (pathFile) => {
  const compexPath = path.resolve(process.cwd(), pathFile);
  const data = fs.readFileSync(compexPath, 'utf-8').toString();
  const descriptor = path.extname(compexPath);
  if (descriptor === '.json') return JSON.parse(data);
  return yaml.safeLoad(data) || {};
};
