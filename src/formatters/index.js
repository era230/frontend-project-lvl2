import formatTree from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const chooseFormatter = (formatName) => {
  if (formatName === 'stylish') {
    return formatTree;
  }
  if (formatName === 'plain') {
    return formatPlain;
  }
  if (formatName === 'json') {
    return formatJson;
  }
  throw new Error(`Unknown formatName: '${formatName}`);
};

export default chooseFormatter;
