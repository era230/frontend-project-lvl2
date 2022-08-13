import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'node:process';
import parse from './parsers.js';
import makeTree from './makeTree.js';
import chooseFormatter from './formatters/index.js';

const getObject = (filepath) => {
  const getFixturePath = path.resolve(cwd(), filepath);
  const data = readFileSync(getFixturePath, 'utf-8');
  const extension = path.extname(filepath).toLowerCase();
  const object = parse(extension)(data);
  return object;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  const tree = makeTree(obj1, obj2);
  return chooseFormatter(formatName)(tree);
};

export default genDiff;
