import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'node:process';
import parse from './parsers.js';
import makeTree from './makeTree.js';
import formatTree from './formatters/stylish.js';

export const getObject = (filepath) => {
  const getFixturePath = path.resolve(cwd(), filepath);
  const data = readFileSync(getFixturePath, 'utf-8');
  const extension = path.extname(filepath).toLowerCase();
  const object = parse(extension)(data);
  return object;
};

const genDiff = (filepath1, filepath2, formatter = formatTree) => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  const result = makeTree(obj1, obj2);
  console.log(formatter);
  return formatter(result);
};

export default genDiff;
