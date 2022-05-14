const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const BrotliGzipPlugin = require('brotli-webpack-plugin')
module.exports = {
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production',
  },
  /*configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        indexPath: path.resolve('dist/index.html'),
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, 'dist'),
        // Required - Routes to render.
        routes: ['/', '/password'],
      }),
      new BrotliGzipPlugin({
        asset: '[path].br[query]',
        algorithm: 'brotli',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      new BrotliGzipPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
  },*/
}
