import { BuildMode, BuildPaths } from '@config/build/types';
import { resolve } from 'path';
import webpack from 'webpack';

import { buildWebpack } from './config/build/buildWebpack';

type EnvVariables = {
  mode: BuildMode;
  port: number;
};

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: resolve(__dirname, 'build'),
    html: resolve(__dirname, 'public', 'index.html'),
    entry: resolve(__dirname, 'src', 'index.tsx'),
    src: resolve(__dirname, 'src'),
    config: resolve(__dirname, 'config'),
    favicon: resolve(__dirname, 'public', 'favicon.ico'),
  };
  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
  });
  return config;
};
