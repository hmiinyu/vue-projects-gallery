const path = require('path');

module.exports = {
  getCssModuleName(isDev) {
    return isDev ? '[path]-[name]-[hash:base64:8]' : '[hash:base64:8]';
  },
  resolve(dir) {
    return path.join(__dirname, '../../', dir);
  }
};
