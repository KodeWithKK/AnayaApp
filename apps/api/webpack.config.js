const nodeExternals = require('webpack-node-externals');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: {
      lambda: './src/lambda.ts',
    },
    output: {
      path: options.output.path,
      filename: 'lambda.js',
      libraryTarget: 'commonjs',
    },
    externals: [
      nodeExternals({
        allowlist: [
          /^@repo\//,
          /^postgres/,
          /^drizzle-orm/,
          /^better-auth/,
          /^@thallesp\/nestjs-better-auth/,
          /^@react-email\//,
          /^react-email/,
          /^@better-auth\/expo/,
          /^zod/
        ],
      }),
      '@nestjs/graphql',
      '@nestjs/microservices',
      '@nestjs/websockets',
      'class-transformer/storage',
    ],
  };
};
