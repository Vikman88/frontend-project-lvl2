#!usr/bin/env node

import program from 'commander';
import path from 'path';
import comparator from '../lib/comparator.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', '[type] output format', 'stylish')
  .arguments('<firstPath> <secondPath>')
  .action((firstPath, secondPath, option) => {
    const { format } = option;
    const filePath1 = path.join(process.cwd(), '/src', '/lib', firstPath);
    const filePath2 = path.join(process.cwd(), '/src', '/lib', secondPath);
    const result = comparator(filePath1, filePath2, format);
    console.log(result);
  });

program.parse(process.argv);
