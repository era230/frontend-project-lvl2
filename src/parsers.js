import yaml from 'js-yaml';

const parse = (data, extension) => {
  let result;
  if (extension === '.json') {
    result = JSON.parse(data);
  }
  if (extension === '.yml' || extension === '.yaml') {
    result = yaml.load(data);
  }
  return result;
};

export default parse;
