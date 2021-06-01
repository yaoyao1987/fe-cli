const { prompt } = require('enquirer')

async function askForFramework() {
  const { framework } = await prompt([
    {
      type: 'select',
      name: 'framework',
      message: 'Please Select a framework:(React/Vue)',
      choices: [
        'Vue',
        'React',
        'None'
      ]
    }
  ])
  return framework
}

async function askForLanguage() {
  const { language } = await prompt([
    {
      type: 'select',
      name: 'language',
      message: 'Please Select a language:(JavaScript/TypeScript)',
      choices: [
        'Javascript',
        'Typescript'
      ]
    }
  ])
  return language
}

module.exports = {
  askForLanguage,
  askForFramework,
};