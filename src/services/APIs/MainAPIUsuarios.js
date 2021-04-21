import axios from 'axios'

let api = axios.create({
    baseURL: "https://vapm-api.herokuapp.com/"
})

export default api;