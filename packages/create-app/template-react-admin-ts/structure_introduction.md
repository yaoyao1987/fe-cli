## 这个文件按工具类大的模块来介绍项目中使用到第三包以及对应配置

### 安装 ESLint 解析 TypeScript 的依赖

1. eslint：javascript 代码检测工具，使用 espree 解析器
2. @typescript-eslint/parser：将 TypeScript 转换为 ESTree，使 eslint 可以识别
3. @typescript-eslint/eslint-plugin：只是一个可以打开或关闭的规则列表

`yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D`
