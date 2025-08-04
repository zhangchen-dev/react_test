const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    configure: (webpackConfig, { env, paths }) => {
      const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);
      if (oneOfRule) {
        // 处理所有 .less 文件并启用 CSS Modules
        const lessRule = {
          test: /\.less$/,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: {
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                },
                importLoaders: 1
              }
            },
            {
              loader: require.resolve('less-loader'),
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }
          ]
        };

        oneOfRule.oneOf.unshift(lessRule);
      }
      return webpackConfig;
    }
  }
};