const env = process.env;

module.exports = {
  isDev: env.NODE_ENV === 'development',
  isSSR: env.ENABLE_SSR,
  mode: env.NODE_ENV || 'production'
};
