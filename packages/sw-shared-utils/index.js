[
  "env",
  "logger",
  "spinner",
].forEach((m) => {
  Object.assign(exports, require(`./lib/${m}`));
});

// 终端样式库，可以提供酷炫的颜色等显示效果
exports.chalk = require("chalk");
// 执行终端命令必备库，类似开启子任务child_process的增强版
exports.execa = require("execa");
// 版本语义化解析库，工具类涉及到各种版本的管理
exports.semver = require("semver");
