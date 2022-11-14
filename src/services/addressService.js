import config from './config.json'
import http from './httpService'

export const createAddress = (objAddress) => {
    return http.post(`${config.base_url}/address`, objAddress)
}
export const deleteAddress = (id) => {
    return http.delete(`${config.base_url}/user-address-delete/${id}`)
}

export const getAddress = () => {
    return http.get(`${config.base_url}/address`)
}
export const editAddress = (id, objAddress) => {
    return http.put(`${config.base_url}/user-address-update/${id}`, objAddress)
}