// import {getProfile} from "../../services/userService";

import {userInfo} from "../../services/authService";

export const userLogin = () => {
    return {type: 'LOGIN'}
}

export const userLogout = () => {
    return async dispatch => {
        await localStorage.removeItem('token')
        await dispatch({type: 'LOGOUT'})
    }
}
export const setUser = () => {
    return async dispatch => {
        const res = await userInfo()
        if (res.status === 200) {
            await dispatch({type: 'INIT_USER', payload: res.data.user})
        }
    }
}
