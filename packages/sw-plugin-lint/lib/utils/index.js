const path = require('path');
const fs = require('fs-extra');

/**
 * file 删除
 * @param {*} file 
 */
exports.rm = (file) => () => fs.removeSync(path.join(process.cwd(), file));

/**
 * file 拷贝
 * @param {*} source 
 * @param {*} target 
 */
exports.copy = (source, target) => {
  const newTarget = path.join(process.cwd(), target);
  const content = fs.readFileSync(path.join(__dirname, '../', source), {
    encoding: 'utf8',
  });
  fs.outputFileSync(newTarget, content);
  console.log(`Add file ${newTarget}`);
}

/**
 * 删除依赖
 * @param {*} dep 
 * @returns 
 */
exports.removeDepVersion = (dep) => (/(\w+)@(\w+)/.test(dep) ? dep.split('@')[0] : dep);
