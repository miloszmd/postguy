var nodeExternals = require('webpack-node-externals');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    renderer: './src/frontend/renderer.js',
    main: './src/backend/main.js'
  },
  output: {
    path:'./dist',
    filename: '[name].js',
  },
  node: {
    __dirname: false,
    __filename: false
  },
  target: 'electron',
  module: {
    loaders: [
      { test: /\.html/, loader: 'file?name=[name].[ext]' },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /\.json$/, loaders: ["json"] }
    ]
  },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin(['bin'], {}),
    new CopyWebpackPlugin([ { from: './src/live-package.json', to: './package.json' } ])
  ]
};
