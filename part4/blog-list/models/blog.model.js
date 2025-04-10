const mongoose = require('mongoose')
const config = require('../utils/config')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

const BlogModel = mongoose.model('Blog', blogSchema)

module.exports = BlogModel