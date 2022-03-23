const { withSentryConfig } = require('@sentry/nextjs')
const withAntdLess = require('next-plugin-antd-less')

const { i18n } = require('./next-i18next.config')

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
}

const moduleExports = withAntdLess({
  webpack(config, { isServer }) {
    if (isServer && process.env.APP_ENV === 'production') {
      require('./utils/generate-sitemap')
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    const webpack = require('webpack')
    config.plugins.push(
      new webpack.ProvidePlugin({
        'window.Quill': 'quill',
      }),
    )
    return config
  },
  i18n,
  env: {
    APP_ENV: process.env.APP_ENV,
    AES_SECRET_KEY: process.env.AES_SECRET_KEY,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  },
})

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
