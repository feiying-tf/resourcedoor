module.exports = {
  // 当查找规则到这个目录就不再往外找了
  root: true,
  // 指定额外的解析器，需要通过npm安装
  parser: 'babel-eslint',
  // 解析器配置
  parserOptions: {
      sourceType: 'module',
      "ecmaVersion": 6 // 启动es6语法支持
  },
  // 指定脚本的运行环境
  env: {
      browser: true,
      node: true,
      es6: true // 支持新的 ES6 全局变量
  },
  // 启用一套默认规则
  extends: 'eslint:recommended',
  // 使用第三方插件
  // plugins: [
  //     'html'
  // ],
  // 添加共享设置
  // 'settings': {
  //     'import/resolver': {
  //         'webpack': {
  //           'config': 'build/webpack.base.conf.js'
  //         }
  //     }
  // },
  // 自定义自己的规则
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则
  // "error" 或 2 - 开启规则
  rules: {
    "no-console": ["error", {
      "allow": ["warn", "error", "info"]
    }]
  }
}
