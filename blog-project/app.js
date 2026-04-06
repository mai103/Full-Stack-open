import express from 'express'
import blogsRouter from'./controllers/blogs.js'
import mongoose from'mongoose'
import userRouter from './controllers/users.js'

import dns from "node:dns/promises";
//to avoid connection failure
dns.setServers(["1.1.1.1", "8.8.8.8"]);


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
app.use('/api/users', userRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})