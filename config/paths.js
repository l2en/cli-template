'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');
const glob = require('glob');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or 'homepage' field to infer
// 'public path' at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);


const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// 各页面的对应的模板文件路径。!!!兼容windows以\作为路径分割符
let htmlEntrys = glob.sync(path.join(__dirname, '../src/pages/*/index.html').split(path.sep).join('/'));

// 各页面的对应的entry文件路径
let jsEntrys = glob.sync(path.join(__dirname, '../src/pages/*/index.js').split(path.sep).join('/'));

// config after eject: we're in ./config/
module.exports = {
  htmlEntrys,
  jsEntrys,
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('dist/source'),
  appPublic: resolveApp('public'),
  // appHtml: resolveApp('public/index.html'),
  // appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  appWebpackCache: resolveApp('node_modules/.cache'),
  appTsBuildInfoFile: resolveApp('node_modules/.cache/tsconfig.tsbuildinfo'),
  swSrc: resolveModule(resolveApp, 'src/service-worker'),
  publicUrlOrPath,
  bizComponents: resolveApp('src/bizComponents'),
  baseComponents: resolveApp('src/baseComponents'),
  domainComponents: resolveApp('src/domainComponents'),
  src: resolveApp('src'),
  main: resolveApp('src/main'),
  http: resolveApp('src/http'),
  models: resolveApp('src/models'),
  pages: resolveApp('src/pages'),
  services: resolveApp('src/services'),
  utils: resolveApp('src/utils'),
  hooks: resolveApp('src/hooks'),
  styles: resolveApp('src/styles'),
};



module.exports.moduleFileExtensions = moduleFileExtensions;
