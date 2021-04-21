import axios from 'axios'

let api = axios.create({
    baseURL: "https://vapm-geomatching.herokuapp.com/"
})

export default api;