import {getDataHeaderFooter} from "../../services/pagesServeice";

export const setOptions = () => {
    return async dispatch => {
        const res = await getDataHeaderFooter()
        await dispatch(setBranchId(res?.data?.header?.branches[0]?.id))
        await dispatch({type: 'INIT_OPTIONS', payload: res?.data})
    }
}
export const setBranchId = (id) => {
    return async dispatch => {
        await localStorage.setItem("branch_id", id)
        await dispatch({type: 'SET_BRANCH_ID', payload: id})
    }
}
