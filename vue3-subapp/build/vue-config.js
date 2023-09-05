const { name } = require("../package.json");
const devServer = require("./dev-server");
const { publicPath } = require("./config");

const baseConfig = {
  publicPath,
  outputDir: `dist/${name}`,
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${name}`,
    },
    plugins: [],
  },
  devServer,
};

module.exports = baseConfig;
