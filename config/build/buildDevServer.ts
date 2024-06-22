import { BuildOptions } from '@config/build/types';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export const buildDevServer = (options: BuildOptions): DevServerConfiguration => {
  return {
    port: options.port ?? 3000,
    open: true,
    historyApiFallback: true,
    compress: true,
    proxy: [
      {
        context: ['/api'],
        target: 'https://belarusbank.by',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/open-banking/v1.0',
        },
      },
    ],
  };
};
