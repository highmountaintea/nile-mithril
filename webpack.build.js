const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.production') });
require('dotenv').config();
const webpack = require('webpack');
const uglifyPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

// toggle the following 3 config settings to customize build
const babel = true;
const minify = true;
const createMap = false;

// inject envs
let plugins = [];
let envs = {};
Object.keys(process.env).filter(key => key.startsWith('MITHRIL_')).forEach(key => {
  envs[key] = JSON.stringify(process.env[key]);
});
plugins.push(new webpack.DefinePlugin(envs));

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

if (minify) plugins.push(new uglifyPlugin({ minimize: true }));

let devtools = undefined;
if (createMap) devtools = 'source-map';


module.exports = {
  entry: {
    app: app,
  },
  output: {
    filename: "static/app.js",
    path: path.resolve(__dirname, 'build'),
    publicPath: "/",
  },
  devtool: devtools,
  plugins: plugins,
  module: {
    rules: rules,
  },
};
