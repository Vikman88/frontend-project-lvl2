#!/usr/bin/env node

import path from 'path';
import program from 'commander';
import gendiff from '../index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', '[type] output format', 'stylish')
  .arguments('<firstPath> <secondPath>')
  .action((firstPath, secondPath, option) => {
    const filePath1 = path.resolve(process.cwd(), firstPath);
    const filePath2 = path.resolve(process.cwd(), secondPath);
    const result = gendiff(filePath1, filePath2, option.format);
    console.log(result);
  });

program.parse(process.argv);
