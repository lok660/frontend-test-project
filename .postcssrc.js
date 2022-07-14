module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 默认值是"px"
      viewportWidth: 750, // 视口宽度，对应的是我们设计稿的宽度
      unitPrecision: 3, // 小数点后的位数
      propList: ['*'], // 需要转换的属性
      viewportUnit: 'vw', // 转换后的单位
      fontViewportUnit: 'vw', // 字体转换后的单位
      selectorBlackList: ['.ignore'], // 排除不转换的类
      minPixelValue: 1, // 小于或等于此值的不转换
      mediaQuery: true, // 允许在媒体查询中转换单位
      replace: true, // 替换包含单位的属性值
      exclude: [/node_modules/], // 排除不需要转换的文件
      landscape: false, // 是否添加横屏查询
      landscapeUnit: 'vw', // 横屏查询单位
      landscapeWidth: 568 // 横屏转换后的宽度
    }
  }
}
