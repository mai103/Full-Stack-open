import axios from "axios"

const baseUrl= 'http://localhost:3003/api/blogs';

let token = null

const setToken = newToken => {
   token = `Bearer ${newToken}`
}

const getBlogs = async () =>{
    const response = await axios.get(baseUrl)
    return response.data;
}

const createBlog = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const update = async (id, newObject) => {
  const response = await axios.patch(`${baseUrl}/${id}/likes`, newObject)
  return response.data
}
export default {getBlogs, createBlog, setToken, update};