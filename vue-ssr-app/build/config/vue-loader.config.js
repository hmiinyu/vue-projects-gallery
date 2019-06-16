const env = require('../env');
const { getCssModuleName } = require('../misc/utils');

module.exports = {
  preserveWhitespace: true,
  hotReload: env.isDev,
  cssModules: {
    localIdentName: getCssModuleName(env.isDev),
    camelCase: true
  }
};
