import axios from 'axios'

const token = localStorage.getItem('token')
console.log(token)
const axiosInstance = axios.create({
    baseUrl: "http://localhost:4000/api",
    headers: {
        "Authorization": token ? `Bearer ${token}` : ''
    }
})

export default axiosInstance