process.env.ENABLE_SSR = true;

const merge = require('webpack-merge');
const env = require('../env');
const baseConfig = require('./base.config');
const devConfig = require('../env/dev.config');
const prdConfig = require('../env/prd.config');

module.exports = merge(baseConfig, env.isDev ? devConfig : prdConfig);
