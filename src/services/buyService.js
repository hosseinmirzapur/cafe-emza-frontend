import config from './config.json'
import http from './httpService'

const additionalConfig = {
    headers: {
        'x-branch-id': localStorage.getItem('branch_id')
    }
}
export const buy = (objBuy) => {
    return http.post(`${config.base_url}/cart-item`, objBuy, additionalConfig)
}

export const getBasketData = (obj) => {
    return http.post(`${config.base_url}/cart-page`, obj, additionalConfig)
}
export const deleteCart = (cart_id) => {
    return http.delete(`${config.base_url}/cart-item-delete/${cart_id}`, additionalConfig)
}
export const editCart = (count, id) => {
    const objData = {count: count}
    return http.put(`${config.base_url}/cart-item/${id}`, objData, additionalConfig)
}
export const editOrder = (objData) => {
    return http.put(`${config.base_url}/cart-item-sentence-update/${objData.id}`, objData, additionalConfig)

}
export const applyPromotion = (promotion_code) => {
    const obj = {promotion_code}
    return http.post(`${config.base_url}/cart-page`, obj, additionalConfig)
}
export const registerOrder = (objectOrder) => {
    return http.post(`${config.base_url}/order`, objectOrder, additionalConfig)
}
export const goPayment = () => {
    const obj = {device: 1}
    return http.post(`${config.base_url}/payment`, obj, additionalConfig)

}
export const getDeliveryPrice=()=>{
    return http.get(`${config.base_url}/delivery-price`, additionalConfig)
}
