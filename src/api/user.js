//用户相关接口
import axios from "../lib/ajaxRequest"

export const getUser = () =>{
    return axios.request({
        url: '/user',
        method: 'get'
    })
}

export const login = (username) =>{
    return axios.request({
        url: '/login',
        method: 'post',
        data: {
            username
        }
    })
}

export const validata = () => {
    return axios.request({
        url: '/validata',
        method: 'get'
    })
}