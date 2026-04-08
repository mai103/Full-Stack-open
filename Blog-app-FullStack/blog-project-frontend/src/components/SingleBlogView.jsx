import { useParams } from 'react-router-dom'

const SingleBlogView = ({ blogs, handleLike, user }) => {
  const id = useParams().id
  
  if (!blogs || !Array.isArray(blogs) || blogs.length === 0) {
    return <p>Loading blogs...</p>
  }

  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return <p>Blog not found</p>
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div className="blog-details">
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
        <div style={{ marginTop: '10px' }}>
          {blog.likes} likes
          {user && <button onClick={() => handleLike(blog)}>like</button>}
        </div>
        <p>added by <strong>{blog.author}</strong></p>
      </div>
    </div>
  )
}

export default SingleBlogView