const path = require('path')
const dotenv = require('dotenv')
const fs = require('fs')
const envFiles = [`.env`, `.env.${process.env.NODE_ENV}`]
for (let file of envFiles) {
  const envConfig = dotenv.parse(fs.readFileSync(file))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}
console.log(process.env.VUE_APP_BASE_API)

export default {
  hostname: process.env.VITE_HOST,
  port: process.env.VITE_PORT,
  // 是否自动在浏览器打开
  open: false,
  // 是否开启 https
  https: false,
  // 服务端渲染
  ssr: false,
  base: process.env.VITE_BASE_URL,
  outDir: process.env.VITE_OUTPUT_DIR,
  /**
   * 引入第三方
   */
  optimizeDeps: {
    include: []
  },

  /**
   * 跨域代理
   */
  proxy: {
    '/api': {
      target: 'http://www.lwp.fun:7000',
      changeOtigin: true,
      rewrite: path => path.replace('/api', '')
    }
  },

  /**
   * alias 配置
   */
  alias: {
    '/@/': path.resolve(__dirname, './src'),
    '/@s/': path.resolve(__dirname, './static')
  }
}
