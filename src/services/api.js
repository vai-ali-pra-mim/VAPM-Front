import axios from 'axios'

let api = axios.create({
    baseURL: "http://localhost:8888"
})

export default api;