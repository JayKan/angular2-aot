'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const {
  ContextReplacementPlugin,
  DefinePlugin,
  ProgressPlugin,
  NoErrorsPlugin,
  LoaderOptionsPlugin
} = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const ForkCheckerPlugin  = require('awesome-typescript-loader').ForkCheckerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const WebpackMd5Hash  = require('webpack-md5-hash');


//=========================================================
//  ENVIRONMENT CONSTANTS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV;
const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ENV_TEST = NODE_ENV === 'test';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;


//=========================================================
//  RULES
//---------------------------------------------------------
const rules = {
  css: {
    test: /\.css$/,
    use: ['raw', 'postcss']
  },
  json: {
    test: /\.json$/,
    use: ['json']
  },
  html: {
    test: /\.html$/,
    use: ['raw'],
    exclude: path.resolve('src/index.html')
  },
  jsSourceMap: {
    test: /\.js$/,
    loader: 'source-map-loader'
  },
  typescript: {
    test: /\.ts$/,
    use: ['awesome-typescript', 'angular2-template'],
    exclude: /node_modules/
  }
};

//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = module.exports = {};

config.resolve = {
  extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
  mainFields: ['module', 'browser', 'main'],
  modules: [
    path.resolve('.'),
    'node_modules'
  ]
};

config.module = {
  rules: [
    rules.css,
    rules.json,
    rules.html,
    rules.jsSourceMap,
    rules.typescript
  ]
};

config.plugins = [
  new ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    path.resolve('src')
  ),
  new ProgressPlugin(),
  new ForkCheckerPlugin(),
  new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  }),
  new NamedModulesPlugin(),
  new LoaderOptionsPlugin({
    debug: false,
    minimize: ENV_PRODUCTION,
    options: {
      postcss: [
        autoprefixer({ browsers: ['last 3 versions'] })
      ]
    }
  }),
];

//=========================================================
//  DEVELOPMENT or PRODUCTION
//---------------------------------------------------------
if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
  config.entry = {
    polyfills: './src/polyfills.ts'
  };

  config.output = {
    path: path.resolve('./public'),
    publicPath: '/'
  };

  config.plugins.push(
    new CommonsChunkPlugin({
      name: ['polyfills'],
      minChunks: Infinity
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: './src/index.html'
    })
  );
}

//=========================================================
//  DEVELOPMENT
//---------------------------------------------------------
if (ENV_DEVELOPMENT) {
  config.devtool = 'cheap-module-source-map';

  config.entry.main = './src/main.jit.ts';

  config.output.filename = '[name].js';

  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    host: HOST,
    port: PORT,
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  }
}

//=========================================================
//  PRODUCTION
//---------------------------------------------------------
if (ENV_PRODUCTION) {
  config.devtool = 'source-map';

  config.entry.main = './src/main.aot.ts';

  config.output.filename = '[name].[chunkhash].js';

  config.plugins.push(
    new NoErrorsPlugin(),
    new WebpackMd5Hash(),
    new UglifyJsPlugin({
      comments: false,
      compress: {
        dead_code: true, // eslint-disable-line camelcase
        screw_ie8: true, // eslint-disable-line camelcase
        unused: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true  // eslint-disable-line camelcase
      }
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

//=========================================================
//  TEST
//---------------------------------------------------------
if (ENV_TEST) {
  config.devtool = 'inline-source-map';
}

