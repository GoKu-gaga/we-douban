const URI = 'https://douban.uieee.com/v2'
const fetch = require('./fetch')

function getMovies(type, page = 1, count = 20, search = '') {
  const params = { start: (page - 1) * count, count: count, city: getApp().data.currentCity }
  return fetch(`${URI}/movie`, type, search ? Object.assign(params, { q: search }) : params)
    .then(res => res.data)
}
function searchBooks(page = 1, count = 20, search = '') {
  const params = { start: (page - 1) * count, count: count, q: search}
  return fetch(`${URI}/book`, 'search', params)
    .then(res => res.data)
}
module.exports = { getMovies, searchBooks}