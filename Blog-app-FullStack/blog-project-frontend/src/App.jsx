import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import './App.css'
import LoginForm from './components/login'
import Blog from './components/blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import SingleBlogView from './components/SingleBlogView'

function App() {
  const [blogs, setBlogs] = useState([]);
  
  const [user, setUser] = useState(() =>{
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser');

    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson);
      blogService.setToken(user.token)
      return user
    }
    return null
  });
  
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success') 

  //to get all blogs 
  useEffect(() => {
    const fetchBlogs = async ()=>{
      try {
        const initialBlogs = await blogService.getBlogs();
        
        const data = Array.isArray(initialBlogs) ? initialBlogs : initialBlogs.blogs
        setBlogs(data)
    } catch(error){
      console.error('Faild to get blogs:', error);
    }}
    fetchBlogs()
  },[])

  async function handleLogin(username, password){
     try{
            const user = await loginService.login({username, password})
            setUser(user)

            setNotification(`Welcome back ${user.name}`)
            setNotificationType('success')
            setTimeout(() => setNotification(null), 5000)
            
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
            blogService.setToken(user.token)


            console.log('Login successful, user state updated:', user)
        } catch{ 
            setNotification('Wrong username or password')
            setNotificationType('error')
            setTimeout(() => setNotification(null), 5000)
        }
  }

  async function handleLogout(){
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null);
  }

  async function addBlog (blogObject){
  try {
    const returnedBlog = await blogService.createBlog(blogObject)
    
    setBlogs(prevBlogs => {
       const currentBlogs = Array.isArray(prevBlogs) ? prevBlogs : []
       return [...currentBlogs, returnedBlog]
    })

    console.log('Blog added successfully!')
  } 
  catch (error) {
    console.error('Error adding blog:', error)
  }
}

async function handleLike(blog) {
  const idToUpdate = blog.id

  const changedBlog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user?.id || blog.user
  }

  try {
    const returnedBlog = await blogService.update(idToUpdate, changedBlog)
    
    setBlogs(prevBlogs =>{
      if (Array.isArray(prevBlogs)) {
          return prevBlogs.map(b => b.id !== blog.id ? b : returnedBlog)
      }
      return {
        ...prevBlogs,
        blogs: prevBlogs.blogs.map(b => b.id !== blog.id ? b : returnedBlog)
      }
      })
  } catch (error) {
    console.error('Error updating likes:', error)

    setNotification('Failed to update likes')
    setNotificationType('error')
    setTimeout(() => setNotification(null), 5000)
  }
}
const padding = { padding: 5 }
  return(
    <Router>
      <div className="container">
        <nav style={{ background: '#eee', padding: '10px' }}>
          <Link style={padding} to="/">blogs</Link>
          {user ? (
            <>
              <Link style={padding} to="/create">create new</Link>
              <span style={padding}>{user.name} logged in</span>
              <button onClick={handleLogout}>logout</button>
            </>
          ) : (
            <Link style={padding} to="/login">login</Link>
          )}
        </nav>

        <Notification message={notification} type={notificationType} />
        <h2>Bloglist App</h2>

        <Routes>
          <Route path="/" element={
            <div>
              {Array.isArray(blogs) && blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
              {/* {blogs.map(blog => <Blog key={blog.id} blog={blog} />)} */}
            </div>
          } />

          <Route path="/login" element={
            user ? <Navigate replace to="/" /> : <LoginForm handleLogin={handleLogin} />
          } />

          <Route path="/create" element={
            user ? <BlogForm createBlog={addBlog} /> : <Navigate replace to="/login" />
          } />

          <Route path="/blogs/:id" element={<SingleBlogView blogs={blogs} handleLike={handleLike} user={user} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App