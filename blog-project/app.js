const config = require('./config')
const express = require('express')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
  })

app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app