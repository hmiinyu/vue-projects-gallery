const path = require('path')
const alias = require('node-require-alias')

module.exports = (callback) => {
  process.env.ENABLE_SSR = true
  alias.setAlias({
    '@build': path.join(__dirname, '../../../build/'),
    '@server': path.join(__dirname, '../'),
    '@public': path.join(__dirname, '../../../public/ssr/')
  })

  callback && callback({
    env: require('@build/env'),
    paths: require('@build/misc/paths'),
    constants: require('@build/misc/constants')
  })
}
