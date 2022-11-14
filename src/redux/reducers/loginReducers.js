export const loginReducer = (state = false, action) => {
    switch (action.type) {
        case 'LOGIN':
            return state = true
        case 'LOGOUT':
            return state = false
        default:
            return state
    }
}
export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'INIT_USER':
            return {...action.payload}
        default:
            return state
    }
}