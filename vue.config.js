'use strict'
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: true,
  publicPath: './',
  productionSourceMap: false, // 去除生产环境.map文件
  configureWebpack: (config) => {
    const configNew = {
      resolve: {
        // 设置 alias
        alias: {
          '@': resolve('src')
        }
      }
    }
    if (process.env.NODE_ENV === 'production') {
      configNew.plugins = [
        // gzip
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      ]
    }
    return configNew
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://itunes.apple.com/hk/',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  pwa: {
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes', // 是否开启apple的pwa
    appleMobileWebAppStatusBarStyle: 'black', // 苹果移动网络应用状态栏样式
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: /.*\.js/, // URL匹配规则，匹配任何包含 /.*\.js/ 的同源请求
          handler: 'networkFirst',
          //选项
          options: {
            // Use a custom cache name for this route.
            cacheName: 'my-js-cache',
            expiration: {
              // 缓存过期时间
              maxEntries: 5, // 最大缓存数量
              maxAgeSeconds: 60 // 缓存时间（s）
            },
            backgroundSync: {
              // 配置后台同步
              name: 'my-app',
              options: {
                maxRetentionTime: 60 * 60 // 最大保留时间
              }
            },
            broadcastUpdate: {
              // 更新栏目
              channelName: 'my-jsupdate-channel'
            },
            plugins: [
              {
                // 缓存即将更新
                cacheWillUpdate: () => {
                  console.log(`%c js cacheWillUpdate`, `color:#006DCB;`);
                },
                // 缓存更新
                cacheDidUpdate: () => {
                  console.log(`%c js cache update`, `color:#006DCB;`);
                },
                // 将使用缓存的响应
                cachedResponseWillBeUsed: () => {
                  console.log(`%c js cachedResponseWillBeUsed`, `color:#006DCB;`);
                },
                // 请求正在获取。。。
                requestWillFetch: () => {
                  console.log(`%c js cache requestWillFetch`, `color:#006DCB;`);
                },
                // 请求获取失败
                fetchDidFail: () => {
                  console.log(`%c js cache fetchDidFail`, `color:red;`);
                }
              }
            ],
            // matchOptions和fetchOptions用于配置处理程序。
            matchOptions: {
              ignoreSearch: true // 忽略搜索
            },
            // 可缓存响应
            cacheableResponse: {
              statuses: [200] // 状态为200的响应可缓存
            }
          }
        },
        {
          urlPattern: new RegExp('https://itunes.apple.com/hk/rss/topfreeapplications/limit=10/json'),
          handler: "NetworkFirst",
          options: {
            cacheName: "pote-cache",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 300,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
            plugins: [
              {
                cacheWillUpdate: () => {
                  console.log(`%c pote cacheWillUpdate`, `color:#006DCB;`);
                }
              }
            ]
          },
        },
        {
          urlPattern: new RegExp('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=100/json'),
          handler: "NetworkFirst",
          options: {
            cacheName: "pote-cache",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 300,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
            plugins: [
              {
                cacheWillUpdate: () => {
                  console.log(`%c pote cacheWillUpdate`, `color:#006DCB;`);
                }
              }
            ]
          },
        }
      ]
    }
  }
}
