const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'vi',
    locales: ['en', 'vi'],
  },
  localeDetection: false,
  localePath: path.resolve('./public/static/locales'),
}
