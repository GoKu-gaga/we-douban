const URI = 'https://douban.uieee.com/v2/movie'
const fetch = require('./fetch')

function getMovies(type, page = 1, count = 20, search = '') {
  const params = { start: (page - 1) * count, count: count, city: getApp().data.currentCity }
  return fetch(URI, type, search ? Object.assign(params, { q: search }) : params)
    .then(res => res.data)
}
module.exports = {getMovies}