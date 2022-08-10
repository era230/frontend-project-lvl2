import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import formatTree from '../src/formatters/stylish.js';
import formatPlain from '../src/formatters/plain.js';
import formatJson from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const files = [
  ['file1.json', 'file2.json', formatTree, 'stylishTest.txt'],
  ['file1.yml', 'file2.yml', formatTree, 'stylishTest.txt'],
  ['file1.json', 'file2.yml', formatTree, 'stylishTest.txt'],
  ['file1.json', 'file2.yaml', formatTree, 'stylishTest.txt'],
  ['file1.yml', 'file2.yaml', formatPlain, 'plainTest.txt'],
  ['file1.json', 'file2.json', formatJson, 'jsonTest.txt'],
];

test.each((files))('check %p and %p as %p', (file1, file2, formatter, testFile) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const expectedFile = readFile(testFile);
  expect(genDiff(filepath1, filepath2, formatter)).toEqual(expect.stringContaining(expectedFile));
});
