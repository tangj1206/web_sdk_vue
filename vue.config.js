module.exports = {
  baseUrl: process.env.NODE_ENV==='production' ? 'https://pm.wul.ai/static/' : '/',
  css: {
    extract: false,
  },
  devServer: {
    headers: {'Access-Control-Allow-Origin': '*'}
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks') // 不启用code splitting，只打包生成一个js
  },
  lintOnSave:true
};
