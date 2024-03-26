import { resolve } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Mode = 'production' | 'development';

type envVariables = {
  mode: Mode;
  port: number;
};

export default (env: envVariables) => {
  const isDev = env.mode === 'development';

  const config: webpack.Configuration = {
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
    devtool: isDev ? 'inline-source-map' : false,
    devServer: isDev
      ? {
          port: env.port ?? 3000,
          open: true,
        }
      : undefined,
  };
  return config;
};
