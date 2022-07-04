import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import { cwd } from 'node:process';
import parse from './parsers.js';

const getFixturePath = (filepath) => path.resolve(cwd(), filepath);
const readFile = (filepath) => readFileSync(filepath, 'utf-8');
const extension = (filepath) => path.extname(filepath).toLowerCase();

const gendiff = (filepath1, filepath2) => {
  const obj1 = parse(readFile(getFixturePath(filepath1)), extension(filepath1));
  const obj2 = parse(readFile(getFixturePath(filepath2)), extension(filepath2));
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.uniq([...keys1, ...keys2]))
    .reduce((acc, key) => {
      if (keys1.includes(key) && keys2.includes(key) && obj1[key] === obj2[key]) {
        acc.push(`   ${key}: ${obj1[key]}`);
      }
      if (keys1.includes(key) && keys2.includes(key) && obj1[key] !== obj2[key]) {
        acc.push(` - ${key}: ${obj1[key]}`);
        acc.push(` + ${key}: ${obj2[key]}`);
      }
      if (keys1.includes(key) && !keys2.includes(key)) {
        acc.push(` - ${key}: ${obj1[key]}`);
      }
      if (!keys1.includes(key) && keys2.includes(key)) {
        acc.push(` + ${key}: ${obj1[key]}`);
      }
      return acc;
    }, []);
  const gendiffStr = `{
${keys.join('\n')}
}`;
  return gendiffStr;
};

export default gendiff;
