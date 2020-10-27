#!usr/bin/env node

import program from 'commander';
import fs from 'fs';
import path from 'path';
import comparator from '../lib/comparator.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format', '[type] output format')
  .arguments('<firstPath> <secondPath>')
  .action((firstPath, secondPath) => {
    const fileData1 = path.join(process.cwd(), '/src', '/lib', firstPath);
    const fileData2 = path.join(process.cwd(), '/src', '/lib', secondPath);
    const data1 = fs.readFileSync(fileData1, 'utf-8');
    const data2 = fs.readFileSync(fileData2, 'utf-8');
    const compareResult = comparator(data1, data2);
    console.log(compareResult);
  });

program.parse(process.argv);
