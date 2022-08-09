import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';
import formatTree from '../src/formatters/stylish.js';
import formatPlain from '../src/formatters/plain.js';
import formatJson from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('check stylish formatter json', () => {
  const testFile = readFile('testFile.txt');
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(gendiff(file1, file2, formatTree)).toEqual(expect.stringContaining(testFile));
});

test('check stylish formatter yml', () => {
  const testFile = readFile('testFile.txt');
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yaml');
  expect(gendiff(file1, file2, formatTree)).toEqual(expect.stringContaining(testFile));
});

test('check stylish formatter different formats', () => {
  const testFile = readFile('testFile.txt');
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.yaml');
  expect(gendiff(file1, file2, formatTree)).toEqual(expect.stringContaining(testFile));
});

test('check plain formatter', () => {
  const testFile = readFile('plainTestFile.txt');
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.yaml');
  expect(gendiff(file1, file2, formatPlain)).toEqual(expect.stringContaining(testFile));
});

test('check json formatter', () => {
  const testFile = readFile('jsonTestFile.txt');
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.json');
  expect(gendiff(file1, file2, formatJson)).toEqual(expect.stringContaining(testFile));
});
