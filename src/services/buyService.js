import config from './config.json'
import http from './httpService'

export const buy = (objBuy) => {
    return http.post(`${config.base_url}/cart-item`, objBuy)
}

export const getBasketData = (obj) => {
    return http.post(`${config.base_url}/cart-page`, obj)
}
export const deleteCart = (cart_id) => {
    return http.delete(`${config.base_url}/cart-item-delete/${cart_id}`)
}
export const editCart = (count, id) => {
    const objData = {count: count}
    return http.put(`${config.base_url}/cart-item/${id}`, objData)
}
export const editOrder = (objData) => {
    return http.put(`${config.base_url}/cart-item-sentence-update/${objData.id}`, objData)

}
export const applyPromotion = (promotion_code) => {
    const obj = {promotion_code}
    return http.post(`${config.base_url}/cart-page`, obj)
}
export const registerOrder = (objectOrder) => {
    return http.post(`${config.base_url}/order`, objectOrder)
}
export const goPayment = () => {
    const obj = {device: 1}
    return http.post(`${config.base_url}/payment`, obj)

}
export const getDeliveryPrice=()=>{
    return http.get(`${config.base_url}/delivery-price`)
}