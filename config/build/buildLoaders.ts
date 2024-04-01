import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';
import { BuildOptions } from '@config/build/types';

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
  const isDev = options.mode === 'development';

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const svgLoader = {
    test: /\.svg$/i,
    type: 'asset',
    resourceQuery: /url/,
  };

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    resourceQuery: { not: [/url/] },
    use: ['@svgr/webpack'],
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      !isDev ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: isDev ? '[path][name]__[local]--[hash:base64:8]' : '[hash:base64:8]',
          },
        },
      },
      'sass-loader',
    ],
  };

  const babelLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  };

  return [assetLoader, scssLoader, babelLoader, svgrLoader, svgLoader];
};
