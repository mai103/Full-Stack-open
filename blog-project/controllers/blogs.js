import {Router} from 'express'
import Blog from '../models/blog.js'
import User from '../models/users.js'

const blogsRouter =Router()
// get blogs
blogsRouter.get('/', async(req, res) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  res.json(blogs)
})

// add new bolg
blogsRouter.post('/', async(req, res) => {
  const body = req.body
  const user = await User.findOne({});

  if (!user) {
    return response.status(400).json({ 
      error: 'no users found in database. Create a user first!' 
    })
  }

  const blog = new Blog({
    title: body.title,
    auther: body.auther,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

export default blogsRouter