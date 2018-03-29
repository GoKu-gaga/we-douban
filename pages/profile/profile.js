// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  loginHandler () {
    wx.showModal({
      title: '想登录？',
      content: '？',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '登录是不可能的'
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '取消是可以的'
          })
        }
      }
    })
  }
})