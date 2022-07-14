import _ from 'lodash';

export default (data) => {
  const unchangedIndent = '   ';
  const addedIndent = ' + ';
  const deletedIndent = ' - ';
  const bracketIndent = ;
  const iter = (data) => {
    if (!_.isObject(data)) {
      return String(data);
    }
    const properties = Object.keys(data)
      .map((key) => `${indent}${key}: ${iter(data[key], replacer, tab + spacesCount)}`)
      .join('\n');
    return `{
${properties}
${replacer.repeat(tab - spacesCount)}}`;
  }
  return iter();
};
