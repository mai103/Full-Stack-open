import {Router} from 'express'
import Blog from '../models/blog'

const blogsRouter =Router()
// get blogs
blogsRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

// add new bolg
blogsRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then(result => {
    res.status(201).json(result)
  })
})

export default blogsRouter