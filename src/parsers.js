import yaml from 'js-yaml';

const parse = (extension) => {
  let result;
  if (extension === '.json') {
    result = JSON.parse;
  }
  if (extension === '.yml' || extension === '.yaml') {
    result = yaml.load;
  }
  return result;
};

export default parse;
