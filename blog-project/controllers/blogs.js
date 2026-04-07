import {Router} from 'express'
import Blog from '../models/blog.js'
import User from '../models/users.js'
import jwt from 'jsonwebtoken'

const blogsRouter =Router()
// get blogs
blogsRouter.get('/', async(req, res) => {
  const {search, author, sortBy, order, page=1, limit=10} = req.query;
  let query ={};

  if(search){
    query.title={
      $regex: search,
      $options:'i'
    }
  }
  if(author){
    query.author=author
  }

  let sortCriteria={}
  if(sortBy){
    if (sortBy !== 'likes'){
      return res.status(400).json({error:"can't sort"})
    }
    const sortOrder = order === 'desc'? -1: 1
    sortCriteria[sortBy] =sortOrder
  }

  const pageNum =Math.max(1,parseInt(page));
  const limitNum =Math.max(1,parseInt(limit));
  const skip = (pageNum-1) * limitNum;
  const totalBlogs = await Blog.countDocuments(query);

  const blogs = await Blog.find(query).sort(sortCriteria).skip(skip).limit(limitNum).populate('user', {username: 1, name: 1})
  res.json({
    metadata:{
      currentPage: pageNum,
      pageSize:blogs.length,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limitNum)
    },blogs})
})

// add new bolg
blogsRouter.post('/', async(req, res) => {
  const body = req.body
  const user = req.user;

 if(!user){
    return res.status(400).json({error:"invalid user or token"})
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

//likes increasment
blogsRouter.patch("/:id/like", async(req, res)=>{
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id,
        {$inc: {likes:1}},{new: true, runValidators:true}
  ).populate('user', {username:1, name:1})

  if(!updatedBlog){
    return res.status(400).json({error:"malfomed id"})
  }
  res.status(200).json(updatedBlog)
})

//delete blog by id
blogsRouter.delete("/:id", async(req, res)=>{
  const user = req.user;

  if(!user){
    return res.status(400).json({error:"invalid user or token"})
  }
  const blog =await Blog.findById(req.params.id);

  if(!blog){
    return res.status(404).json({error: "blog not found"})
  }
  
  if(blog.user.toString() !== user.id.toString()){
    return res.status(401).json({error:"only the author can delete this blog"})
  }
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
})
export default blogsRouter