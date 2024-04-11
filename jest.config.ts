import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  moduleNameMapper: {
    '\\.(svg)(\\?url)?$': 'babel-jest',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'babel-jest',
  },
};

export default config;
