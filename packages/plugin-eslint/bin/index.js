#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk');
const packageJson = require('../package.json');

program
  .command(packageJson.name)
  .version(packageJson.version, '-v --version')

program
  .command('eslint')
  .description('Auto Config Eslint.')
  .action(() => {
    require('../lib')()
  })

// add some useful info on help
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`lint <command> --help`)} for detailed usage of given command.`)
  console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))

program.parse(process.argv)