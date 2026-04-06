import express from 'express'
import blogsRouter from'./controllers/blogs'
import mongoose from'mongoose'

const PORT = process.env.PORT || 3003
const mongouri = process.env.MONGODB_URI

const app = express()

mongoose.connect(mongouri)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
  })

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})