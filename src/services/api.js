import axios from "axios" //npm install axios

export const api = axios.create({
    baseURL: "http://localhost:3333"
})

