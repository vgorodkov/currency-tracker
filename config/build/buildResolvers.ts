import { Configuration } from 'webpack';
import { BuildOptions } from '@config/build/types';

export const buildResolvers = (
  options: BuildOptions
): Configuration['resolve'] => {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': options.paths.src,
      '@config': options.paths.config,
    },
  };
};
