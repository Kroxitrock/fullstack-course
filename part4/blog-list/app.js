const express = require('express')
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogsRouter = require('./controllers/blogs.controller')

const app = express()

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
    .then(_result => {
        console.log('connected to MongoDB')
    }).catch(error => {
    console.log('error connecting to MongoDB:', error.message)
})

app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app