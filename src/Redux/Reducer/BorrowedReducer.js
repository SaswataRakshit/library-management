const initialState = {
    borrowed: []
}

export const borrowedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BORROWED':
            return {
                ...state,
                borrowed: action.payload
            }
        default:
            return state
    }
}