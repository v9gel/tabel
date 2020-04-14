module.exports = {
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: "./server"
    }
  },
  devServer: {
    disableHostCheck: true
  },

  lintOnSave: false,
  publicPath: "",
};
