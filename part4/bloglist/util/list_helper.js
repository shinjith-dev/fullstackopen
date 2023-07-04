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

  const authorBlogs = _.groupBy(blogs, 'author')
  const max = _.maxBy(Object.values(authorBlogs), 'length')

  return max[0].author
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorBlogs = _.groupBy(blogs, 'author')
  const authorLikes = Object.values(authorBlogs).map((author) =>
    author.reduce(
      (prev, curr) => {
        return {
          author: curr.author,
          likes: prev.likes + curr.likes
        }
      },
      { likes: 0 }
    )
  )
  return _.maxBy(authorLikes, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
