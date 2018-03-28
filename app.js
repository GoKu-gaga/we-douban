/**
 * Douban API 模块
 * @type {Object}
 */
const douban = require('./utils/douban.js')
//app.js
App({
  data: {
    currentCity: '广州'
  },
  /**
   * Douban API
   */
  douban: douban,
  onLaunch: function () {
  },
  globalData: {
    userInfo: null
  }
})