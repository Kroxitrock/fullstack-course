const Blog = require("../models/blog.model");
const blogsRouter = require('express').Router();


blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title) {
        return response.status(400).json({ error: 'title missing' })
    }

    if (!blog.url) {
        return response.status(400).json({ error: 'url missing' })
    }

    if (!blog.likes) {
        blog.likes = 0
    }

    const result = await blog.save()

    console.log(result)
    response.status(201).json(result)
})

module.exports = blogsRouter