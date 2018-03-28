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
    dataList: []
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  loadMore () {
    if (!this.data.inputValue) return
    let douban = app.douban
    let { searchType, inputValue, pageIndex, pageSize } = this.data
    let pro
    if(searchType === 'movie') {
      pro = douban.getMovies('search', pageIndex++, pageSize, inputValue)
    }
    if (searchType === 'book') {
      pro = douban.searchBooks(pageIndex++, pageSize, inputValue)
    }
    let resType = searchType === 'movie' ? 'subjects' : 'books'
    pro.then(res => {
      this.setData({
        pageIndex: pageIndex,
        dataList: this.data.dataList.concat(res[resType])
      })
    })
    .catch(e => {
      console.log(e)
    })
  },

  searchMovies () {
    if (this.data.searchType === 'book') {
      this.setData({
        pageIndex: 1
      })
    }
    this.setData({
      pageIndex: 1,
      searchType: 'movie',
      dataList: []
    })
    this.loadMore()
  },

  searchBook () {
    if (this.data.searchType === 'movie') {
      this.setData({
        pageIndex: 1
      })
    }
    this.setData({
      searchType: 'book',
      dataList: []
    })
    this.loadMore()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})