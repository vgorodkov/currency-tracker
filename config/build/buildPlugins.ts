import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { Configuration } from 'webpack';
import { BuildOptions } from '@config/build/types';
import Dotenv from 'dotenv-webpack';

export const buildPlugins = ({ mode, paths }: BuildOptions): Configuration['plugins'] => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new Dotenv(),
  ];

  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      })
    );
  }

  return plugins;
};
