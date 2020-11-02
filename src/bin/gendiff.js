#!usr/bin/env node

import program from 'commander';
import path from 'path';
import comparator from '../lib/comparator.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format', '[type] output format')
  .arguments('<firstPath> <secondPath>')
  .action((firstPath, secondPath) => {
    const filePath1 = path.join(process.cwd(), '/src', '/lib', firstPath);
    const filePath2 = path.join(process.cwd(), '/src', '/lib', secondPath);
    const compareResult = comparator(filePath1, filePath2);
    console.log(compareResult);
  });

program.parse(process.argv);
