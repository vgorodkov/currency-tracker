import { resolve } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

type Mode = 'production' | 'development';

type envVariables = {
  mode: Mode;
};

export default (env: envVariables) => {
  const config = {
    mode: env.mode ?? 'development',
    entry: resolve(__dirname, 'src', 'index.ts'),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
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
  return config;
};
