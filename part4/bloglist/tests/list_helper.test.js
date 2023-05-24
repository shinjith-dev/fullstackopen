const listHelper = require('../util/list_helper')

test('dummy returns one', () => {
  expect(listHelper.dummy([])).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('[listhelpertest] favorite blog', () => {
  test('most liked of 4 blogs', () => {
    const result = listHelper.favoriteBlog(listWithFourBlog)
    expect(result).toEqual({
      _id: '5a422aa71b54a6d89234d17f8',
      title: 'Go To Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    })
  })
})

describe('[listhelpertest] most blogs', () => {
  test('most blogs author of 4 blogs', () => {
    const result = listHelper.mostBlogs(listWithFourBlog)
    expect(result).toBe('Shinjith Dev')
  })
})

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithFourBlog = [
  {
    _id: '5a422aa71b54a62378yh234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 1,
    __v: 0
  },
  {
    _id: '5a422aa71b54a6d89234d17f8',
    title: 'Go To Harmful',
    author: 'Robin',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Better don\'t say',
    author: 'Shinjith Dev',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Better say',
    author: 'Shinjith Dev',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 4,
    __v: 0
  }
]
