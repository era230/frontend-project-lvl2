import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import { cwd } from 'node:process';

const gendiff = (filepath1, filepath2) => {
  const normalizePath1 = path.resolve(cwd(), filepath1);
  const normalizePath2 = path.resolve(cwd(), filepath2);
  const obj1 = JSON.parse(readFileSync(normalizePath1, 'utf-8'));
  const obj2 = JSON.parse(readFileSync(normalizePath2, 'utf-8'));
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
  console.log(gendiffStr);
};

export default gendiff;
