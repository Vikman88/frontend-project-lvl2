import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

export default (nameFile) => {
  const pathFile = path.resolve(process.cwd(), nameFile);
  const data = fs.readFileSync(pathFile, 'utf-8').toString();
  const format = path.extname(pathFile);
  if (format === '.json') return JSON.parse(data);
  return yaml.safeLoad(data) || {};
};
