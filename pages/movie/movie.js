// 获取全局应用程序实例对象
const app = getApp()
// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boards: [
      { key: 'in_theaters'},
      { key: 'coming_soon'},
      { key: 'new_movies'},
      { key: 'top250'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    let tasks = this.data.boards.map(board => {
      return app.douban.getMovies(board.key, 1, 8)
        .then(bres => {
          board.title = bres.title
          board.movies = bres.subjects
          return board
        })
    })
    Promise.all(tasks).then(boards => {
      this.setData({boards: boards, loading: false})
      wx.hideLoading()
    })
  }
})