const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((prev, curr) => prev + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((prev, current) =>
      prev.likes > current.likes ? prev : current
    )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorBolgs = _.groupBy(blogs, 'author')
  const max = _.maxBy(Object.values(authorBolgs), 'length')

  return max[0].author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
