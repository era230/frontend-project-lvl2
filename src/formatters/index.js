import formatTree from './stylish.js';
import formatPlain from './plain.js';

const format = (formatName, data) => {
  switch (formatName) {
    case 'stylish':
      return formatTree(data);
    case 'plain':
      return formatPlain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Unknown formatName: '${formatName}`);
  }
};

export default format;
