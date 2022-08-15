import yaml from 'js-yaml';

const parse = (format, data) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown extension: ${format}`);
  }
};

export default parse;
