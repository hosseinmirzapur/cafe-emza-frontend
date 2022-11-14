export const optionsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'INIT_OPTIONS':
            return {...action.payload}
        default:
            return state
    }
}
export const branchIdReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_BRANCH_ID':
            return action.payload
        default:
            return state
    }
}