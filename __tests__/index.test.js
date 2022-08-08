import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';
import formatTree from '../src/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('check json', () => {
  const testFile = readFile('testFile.txt');
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(gendiff(file1, file2, formatTree)).toEqual(expect.stringContaining(testFile));
});

test('check yml', () => {
  const testFile = readFile('testFile.txt');
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yaml');
  expect(gendiff(file1, file2, formatTree)).toEqual(expect.stringContaining(testFile));
});

test('check different formats', () => {
  const testFile = readFile('testFile.txt');
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.yaml');
  expect(gendiff(file1, file2, formatTree)).toEqual(expect.stringContaining(testFile));
});
