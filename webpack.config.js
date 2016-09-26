const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

var GA_UA = process.env.GA_UA || null;
GA_UA = JSON.stringify(GA_UA);
console.log(GA_UA);

module.exports = {
  entry: {
    app: './client',
    vendor: [
      'isomorphic-fetch',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk'
    ]
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/i,
        loader: ExtractTextPlugin.extract('style',
          `css?modules&localIdentName=[name]_[local]__[hash:base64:5]!postcss`),
      },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=10000!img?minimize&optimizationLevel=5&progressive=true' }]
  },
  postcss: [ 
    autoprefixer({ browsers: ['last 2 versions', 'iOS 6', 'ie 9', 'safari 5', 'opera 12.1', 'android 4'] }) 
  ],
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new webpack.DefinePlugin({ 'process.env.GA_UA': GA_UA }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ]

}
