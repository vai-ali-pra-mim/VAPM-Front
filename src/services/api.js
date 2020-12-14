import axios from 'axios'

let api = axios.create({
    baseURL: "https://vapm-frontend.herokuapp.com/"
})

export default api;