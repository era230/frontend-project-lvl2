import yaml from 'js-yaml';

const parse = (format, fileData) => {
  switch (format) {
    case 'json':
      return JSON.parse(fileData);
    case 'yml':
    case 'yaml':
      return yaml.load(fileData);
    default:
      throw new Error(`Unknown extension: ${format}`);
  }
};

export default parse;
