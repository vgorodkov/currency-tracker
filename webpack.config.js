const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = (env) => {
  return {
    mode: env.mode ?? 'development',
    entry: resolve(__dirname, 'src', 'index.js'),
    output: {
      path: resolve(__dirname, 'build'),
      filename: 'bundle.[contenthash].js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'public', 'index.html'),
      }),
    ],
  };
};
