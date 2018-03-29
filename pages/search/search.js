// 获取全局应用程序实例对象
const app = getApp()
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchType: '',
    inputValue: '',
    pageIndex: 1,
    pageSize: 10,
    dataList: [],
    hasMore: false,
    isLoading: false
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  /**
   * 加载更多
   */
  loadMore () {
    let { searchType, inputValue, pageIndex, pageSize, isLoading } = this.data
    if (!inputValue || isLoading) return
    let douban = app.douban
    let pro
    this.setData({
      isLoading: true
    })
    wx.showLoading({
      title: '加载中...',
    })

    if(searchType === 'movie') {
      pro = douban.getMovies('search', pageIndex++, pageSize, inputValue)
    }
    if (searchType === 'book') {
      pro = douban.searchBooks(pageIndex++, pageSize, inputValue)
    }
    let resType = searchType === 'movie' ? 'subjects' : 'books'
    pro.then(res => {
      if(res[resType].length > 0) {
        this.setData({
          hasMore: true,
          pageIndex: pageIndex,
          dataList: this.data.dataList.concat(res[resType])
        })
      } else {
        this.setData({
          hasMore: false
        })
      }
      this.setData({
        isLoading: false
      })
      wx.hideLoading()
    })
    .catch(e => {
      this.setData({
        isLoading: false
      })
      wx.hideLoading()
      console.log(e)
    })
  },
  /**
   * 搜索电影
   */
  searchMovies () {
    this.setData({
      pageIndex: 1,
      searchType: 'movie',
      dataList: []
    })
    this.loadMore()
  },
  /**
   * 搜索图书
   */
  searchBook () {
    this.setData({
      pageIndex: 1,
      searchType: 'book',
      dataList: []
    })
    this.loadMore()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let { hasMore, isLoading } = this.data
    if (!hasMore || isLoading) return
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})