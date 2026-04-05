import config  from './config'
import express from 'express'
import blogsRouter from'./controllers/blogs'
import mongoose from'mongoose'

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

export default app