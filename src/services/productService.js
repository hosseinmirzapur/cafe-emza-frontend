import config from './config.json'
import http from './httpService'

export const rateProduct = (id, rate) => {
    const objRate = {
        rate_amount: rate,
        product_id: id
    }
    return http.post(`${config.base_url}/rate`, objRate)
}
export const getProduct = id => {
    return http.get(`${config.base_url}/product/${id}`)
}
export const findProducts = string => {
    const objSearch = {
        search: string
    }
    return http.post(`${config.base_url}/web-search`, objSearch)
}