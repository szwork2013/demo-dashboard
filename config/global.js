var webpack = require('webpack');
var path = require('path');

module.exports = function(PATHS, NODE_ENV) {

  console.log(NODE_ENV, 'NODE_ENV');

  return {

    output: {
      path: path.resolve(PATHS.dist),
      filename: path.join('assets', '[name].js'),
      // chunkFilename: '[name].js',
      publicPath: '/',
    },

    cache: true,

    resolve: {
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: ['node_modules'],
      alias: {
        // Path aliases.
        _containers: path.resolve(PATHS.src, 'containers'),
        _components: path.resolve(PATHS.src, 'components'),
        _constants: path.resolve(PATHS.src, 'constants'),
        _data: path.resolve(PATHS.src, 'data'),
        _reducers: path.resolve(PATHS.src, 'reducers'),
        _store: path.resolve(PATHS.src, 'store'),
        _middleware: path.resolve(PATHS.src, 'middleware'),
        _routes: path.resolve(PATHS.src, 'routes'),
        _actions: path.resolve(PATHS.src, 'actions'),
        _utils: path.resolve(PATHS.src, 'utils'),
        _languages: path.resolve(PATHS.src, 'languages'),
        _styles: path.resolve(PATHS.src, 'styles'),
      },

    },

    resolveLoader: {
      modulesDirectories: ['node_modules'],
      moduleTemplates: ['*-loader', '*'],
      extensions: ['', '.js', '.jsx'],
    },

    postcss: function() {
      return [
        require('postcss-center'),
        // This plugin allow to use SASS syntax.
        require('precss'),
        require('autoprefixer'),
        require('postcss-focus'),
        // require('stylelint'),
        // require('postcss-reporter')({
        //   clearMessages: true,
        // }),
      ];
    },

  };
};
