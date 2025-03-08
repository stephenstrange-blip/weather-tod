const merge = require("webpack-merge");
const common = require("webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtools: "eval-source-map",
  devServer: {
    watchFiles: "./src/index.html",
  },
});
