const fs = require('fs')
const path = require('path')

void (async () => {
  const templates = fs
    .readdirSync(__dirname)
    .filter((d) => d.startsWith('template-'))
  for (const t of templates) {
    const pkgPath = path.join(__dirname, t, `package.json`)
    const pkg = require(pkgPath)
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
  }
})()