const Blog = require("../models/blog.model");
const blogsRouter = require('express').Router();

blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRouter.post('', async (request, response) => {
    const blog = new Blog(request.body)
    const user = request.user
    if (!user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (!blog.title) {
        return response.status(400).json({ error: 'title missing' })
    }

    if (!blog.url) {
        return response.status(400).json({ error: 'url missing' })
    }

    if (!blog.likes) {
        blog.likes = 0
    }

    blog.user = user.id

    const result = await blog.save()

    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    const blogToDelete = await Blog.findById(id)
    if (!blogToDelete) {
        return response.status(404).json({ error: 'blog not found' })
    }

    if (!request.user || blogToDelete.user.toString() !== request.user.id.toString()) {
        return response.status(401).json({ error: 'unauthorized' })
    }

    await Blog.findByIdAndDelete(id)

    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const blog = request.body

    if (!blog.title) {
        return response.status(400).json({ error: 'title missing' })
    }

    if (!blog.url) {
        return response.status(400).json({ error: 'url missing' })
    }

    if (!blog.likes) {
        blog.likes = 0
    }

    const blogToUpdate = await Blog.findById(id)
    if (!blogToUpdate) {
        return response.status(404).json({ error: 'blog not found' })
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })

    if (!updatedBlog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    response.json(updatedBlog)
})

module.exports = blogsRouter