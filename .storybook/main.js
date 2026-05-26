const path = require('path')

module.exports = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-webpack5-compiler-babel',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    config.devtool = 'inline-source-map'

    // MDX loader (addon-docs preset doesn't merge automatically in some setups)
    config.module.rules.push({
      test: /\.mdx$/,
      exclude: /(stories|story)\.mdx$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: { babelrc: true },
        },
        {
          loader: require.resolve('@storybook/addon-docs/mdx-loader'),
        },
      ],
    })

    // Non-module SCSS
    config.module.rules.push({
      test: /(?<!\.module)\.s[ca]ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    })

    // Module SCSS
    config.module.rules.push({
      test: /\.module\.s[ca]ss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        },
        'sass-loader',
      ],
    })

    config.entry.unshift(
      path.resolve(__dirname, '../stories/resources/main.scss')
    )

    config.resolve.alias['react-big-calendar'] = path.resolve(
      __dirname,
      '../src'
    )

    return config
  },
}
