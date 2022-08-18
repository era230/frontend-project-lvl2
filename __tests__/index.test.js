import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const files = [
  ['file1.json', 'file2.json', 'stylish', 'stylishTest.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'stylishTest.txt'],
  ['file1.json', 'file2.yaml', 'stylish', 'stylishTest.txt'],
  ['file1.json', 'file2.yml', undefined, 'stylishTest.txt'],
  ['file1.yaml', 'file2.yml', 'plain', 'plainTest.txt'],
  ['file1.json', 'file2.json', 'json', 'jsonTest.txt'],
];

test.each(files)(
  'compare %p and %p in %p',
  (file1, file2, formatName, testFile) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    const expectedFile = readFile(testFile);
    expect(genDiff(filepath1, filepath2, formatName)).toEqual(
      expect.stringContaining(expectedFile),
    );
  },
);
