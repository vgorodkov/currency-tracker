import { resolve } from 'path';
import webpack from 'webpack';
import { buildWebpack } from './config/build/buildWebpack';
import { BuildMode, BuildPaths } from './config/build/types';

type envVariables = {
  mode: BuildMode;
  port: number;
};

export default (env: envVariables) => {
  const paths: BuildPaths = {
    output: resolve(__dirname, 'build'),
    html: resolve(__dirname, 'public', 'index.html'),
    entry: resolve(__dirname, 'src', 'index.tsx'),
  };
  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths,
  });
  return config;
};
