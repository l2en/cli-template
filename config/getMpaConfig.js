

const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');
const paths = require('./paths');
const appDirectory = fs.realpathSync(process.cwd());
const pkg = require('../package.json');
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

function makeMultiConfig(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  let htmlWebpackPlugins = [], entrys = {};


  // multi htmlentry
  paths.htmlEntrys.forEach(htmlEntryPath => {
    const entryName = htmlEntryPath.match(/pages\/(.*)\/index.html/)[1];
    const HTML_MINIFY = {
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    };

    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            filename: `${entryName}/index.html`,
            template: resolveApp(`src/pages/${entryName}/index.html`),
            chunks: [entryName]
          },
          isEnvProduction
            ? HTML_MINIFY
            : undefined
        )
      )
    )
  });

  // multi jsentry
  paths.jsEntrys.forEach((jsEntryPath) => {
    const entryName = jsEntryPath.match(/pages\/(.*)\/index.js/)[1];
    
    entrys[entryName] = [jsEntryPath].filter(Boolean);
  });

  // output
  function output() {
    return {
      path: paths.appBuild,
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction
        ? `[name]/[name].[contenthash:8]_${pkg.version}.js`
        : isEnvDevelopment && '[name]/[name]-bundle.js',

      chunkFilename: isEnvProduction
        ? `[name]/[name].[contenthash:8].chunk_${pkg.version}.js`
        : isEnvDevelopment && '[name]/[name].chunk.js',

      // assetModuleFilename: '[name]/media/[name].[hash][ext]',
      publicPath:  isEnvDevelopment ? undefined : '../',
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
          path
            .relative(paths.appSrc, info.absoluteResourcePath)
            .replace(/\\/g, '/')
        : isEnvDevelopment &&
        (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
    }
  }

  return {
    entrys,
    htmlWebpackPlugins,
    output: output()
  }
}

module.exports = makeMultiConfig;
