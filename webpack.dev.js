const path = require('path');

const port = 8020;
const openBrowser = true;
const babel = true;

let app = ['./client/index.js'];
let rules = [];
if (babel) {
  app.unshift('babel-polyfill');
  rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    use : {
      loader: 'babel-loader',
      options: {
        presets: ['env'],
        plugins: ['transform-object-rest-spread'],
      },
    },
  });
}

module.exports = {
  entry: {
    app: app,
  },
  output: {
    filename: "static/app.js",
    path: path.resolve(__dirname, 'build'),
    publicPath: "/",
  },
  devtool: 'source-map',
  devServer: {
    port: port,
    open: openBrowser,
    historyApiFallback: {
      index: 'index.html',
    },
    // proxy: {
    //   "/api": "http://localhost:3750"
    // },
    contentBase: 'public',
  },
  module: {
    rules: rules,
  },
};
