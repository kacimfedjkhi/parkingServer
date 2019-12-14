const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: ["regenerator-runtime/runtime", "./src/index.js"],
  target: "node",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "build/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
