import config from './config.json'

import http from './httpService'
import axios from "axios";

export const getDataPage = (pageName, id) => {
    if (id) {
        axios.defaults.headers.common["x-branch-id"] = id;
    }
    return http.get(`${config.base_url}/website-page?page=${pageName.toUpperCase()}`)
}
export const cv = (objectData) => {
    return http.post(`${config.base_url}/cv`, objectData)
}
export const association = (objectData) => {
    return http.post(`${config.base_url}/association`, objectData)
}
export const getDataHeaderFooter = () => {
    return http.get(`${config.base_url}/init`)
}
export const allHistory = () => {
    return http.get(`${config.base_url}/history-page`)
}
export const contact_us_form = (objForm) => {
    return http.post(`${config.base_url}/support`, objForm)
}

export const terms = () => {
    return http.get(`${config.base_url}/terms`)
}
export const getMarket = () => {
    return http.get(`${config.base_url}/store-products`)
}
export const changeRank = obj => {
    return http.post(`${config.base_url}/rank-transaction`, obj)
}
export const rankVerify = obj => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    return http.post(`${config.base_url}/rank-transaction-verify`, obj)
}
export const getNotifications = () => {
    return http.get(`${config.base_url}/notification`)
}
export const getVideo=()=>{
    return http.get(`${config.base_url}/video`)
}
