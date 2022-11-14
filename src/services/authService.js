import config from './config.json'
import http from './httpService'

export const sendMobileNumber = (obj) => {
    return http.post(`${config.base_url}/phone-number-verification`, obj)
}

export const codeConfirm = (obj) => {
    return http.post(`${config.base_url}/confirm-code`, obj)
}
export const registerUser = obj => {
    return http.post(`${config.base_url}/user`, obj)
}
export const userlogout = () => {
    return http.get(`${config.base_url}/logout`)
}
export const userInfo = () => {
    return http.get(`${config.base_url}/user/init`)
}
export const userUpdate = (objProfile) => {
    return http.put(`${config.base_url}/user`, objProfile)
}
