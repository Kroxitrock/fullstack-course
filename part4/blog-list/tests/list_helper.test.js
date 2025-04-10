const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]

    test('when list is empty, equals 0', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes([...listWithOneBlog, ...listWithOneBlog])
        assert.strictEqual(result, 10)
    })
})

describe('favorite blog', () => {
    const blog1 = {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }

    const blog2 = {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 6,
        __v: 0
    }

    test('when list is empty, returns null', () => {
        const result = listHelper.favoriteBlog([])
        assert.strictEqual(result, null)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.favoriteBlog([blog1])
        assert.deepStrictEqual(result, blog1)
    })

    test('when list has multiple blogs, returns the one with most likes', () => {
        const result = listHelper.favoriteBlog([blog1, blog2])
        assert.deepStrictEqual(result, blog2)
    })
})

describe('most blogs', () => {
    const blogs = [{
        _id: '5a422aa71b54a676234d17f9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }, {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 6,
        __v: 0
    }, {
        _id: '5a422aa71b54a676234d17f87',
        title: 'Mdaaa',
        author: 'Sashko',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 6,
        __v: 0
    }]

    test('when list is empty, returns null', () => {
        const result = listHelper.mostBlogs([])
        assert.strictEqual(result, null)
    })

    test('when list has only one blog, returns that author with 1 blog', () => {
        const result = listHelper.mostBlogs([blogs[0]])
        assert.deepStrictEqual(result, { author: blogs[0].author, blogs: 1 })
    })

    test('when list has multiple blogs, returns the author with most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 2 })
    })
})

describe('most likes', () => {

    const blogs = [{
        _id: '5a422aa71b54a676234d17f9',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }, {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 6,
        __v: 0
    }, {
        _id: '5a422aa71b54a676234d17f87',
        title: 'Mdaaa',
        author: 'Sashko',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 13,
        __v: 0
    }]

    test('when list is empty, returns null', () => {
        const result = listHelper.mostLikes([])
        assert.strictEqual(result, null)
    })

    test('when list has a single blog, returns that author with the likes of that blog', () => {
        const result = listHelper.mostLikes([blogs[0]])
        assert.deepStrictEqual(result, {author: blogs[0].author, likes: blogs[0].likes})
    })

    test('when list has multiple blogs, returns the author with most likes', () => {
        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result, {author: 'Sashko', likes: 13})
    })
})