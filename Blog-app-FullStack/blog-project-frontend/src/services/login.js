import axios from "axios"

const baseUrl= 'http://localhost:3003/api/login';

const login = async Credentials =>{
    const response = await axios.post(baseUrl, Credentials)
    return response.data;
}

export default {login}