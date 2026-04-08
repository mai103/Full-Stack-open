import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className="formDiv">
      <h3>Create a new blog</h3>
      <form onSubmit={addBlog}>
            <input
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            placeholder='write title here'
            />
        
            <input
            value={newAuthor}
            onChange={event => setNewAuthor(event.target.value)}
            placeholder='write author here'
            />
            
            <input
            value={newUrl}
            onChange={event => setNewUrl(event.target.value)}
            placeholder='write url here'
            />

        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm