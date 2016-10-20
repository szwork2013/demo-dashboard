var webpack = require('webpack');
var path = require('path');

// Webpack plugins.
var HtmlPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(PATHS) {

  return {

    context: PATHS.root,

    entry: {
      application: [path.resolve(PATHS.src, 'index.js')],
    },

    debug: false,

    devtool: 'cheap-source-map',

    module: {
      loaders: [
        // JSX.
        {
          test: /\.jsx?$/,
          include: PATHS.src,
          exclude: PATHS.node_modules,
          loader: 'babel?cacheDirectory',
        },
        {
          test: /\.png|\.jpe?g|\.gif|\.svg|\.woff|\.woff2|\.ttf|\.eot|\.ico|\.svg$/,
          loader: 'file?name=files/[name].[hash].[ext]?',
        },
        // CSS/SASS.
        {
          test: /\.s?(a|c)ss$/,
          include: PATHS.src,
          exclude: path.resolve(PATHS.src, 'styles'),
          loader: ExtractTextPlugin.extract(
            'style',
            ['css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss', 'sass']
          ),
        },
        {
          test: /\.s?(a|c)ss$/,
          include: [path.resolve(PATHS.src, 'styles'), PATHS.node_modules],
          loader: ExtractTextPlugin.extract(
            'style',
            ['css', 'postcss', 'sass']
          ),
        },
      ]
    },

    plugins: [
      new ExtractTextPlugin(path.join('assets', '[name].css'), {
        allChunks: true,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new HtmlPlugin({
        title: 'Welltory - Персональный аналитики здоровья Welltory',
        chunks: ['application'],
        filename: 'index.html',
        template: path.join(PATHS.root, 'templates', 'index.html'),
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
    ],

  };
};
