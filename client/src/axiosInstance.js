import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://gmodechatz.herokuapp.com/app/"
})