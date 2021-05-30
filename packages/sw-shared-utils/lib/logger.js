const chalk = require("chalk");
const readline = require("readline");

const { stopSpinner } = require("./spinner");

const logInfo = console.log;
const logError = console.error;
const logWarn = console.warn;

const format = (label, msg) => {
  return msg
    .split("\n")
    .map((line, i) => {
      return i === 0
        ? `${label} ${line}`
        : line.padStart(stripAnsi(label).length);
    })
    .join("\n");
};

module.exports.log = (msg = "") => {
  logInfo(msg);
};

module.exports.info = (msg) =>
  logInfo(format(chalk.bgBlue.black(" INFO "), msg));

module.exports.done = (msg) =>
  logInfo(format(chalk.bgGreen.black(" DONE "), msg));

module.exports.warn = (msg) =>
  logWarn(format(chalk.bgYellow.black(" WARN "), chalk.yellow(msg)));

module.exports.error = (msg) => {
  stopSpinner();
  logError(format(chalk.bgRed(" ERROR "), chalk.red(msg)));

  if (msg instanceof Error) {
    logError(msg.stack);
  }
};

// 清除终端内容
exports.clearConsole = (title) => {
  if (process.stdout.isTTY) {
    const blank = "\n".repeat(process.stdout.rows);
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    if (title) {
      console.log(title);
    }
  }
};
