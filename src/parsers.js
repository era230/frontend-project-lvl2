import yaml from 'js-yaml';

const parse = (extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse;
    case '.yml':
    case '.yaml':
      return yaml.load;
    default:
      throw new Error(`Unknown extension: ${extension}`);
  }
};

export default parse;
