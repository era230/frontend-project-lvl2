import formatTree from './stylish.js';
import formatPlain from './plain.js';

const chooseFormatter = (formatName) => {
  if (formatName === 'stylish') {
    return formatTree;
  }
  if (formatName === 'plain') {
    return formatPlain;
  }
  throw new Error(`Unknown formatName: '${formatName}`);
};

export default chooseFormatter;
