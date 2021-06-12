const initialState = {
    borrowed: [],
    availableBook: [],
    status: null,
    lastSync: null,
    returnBookName: null
}

export const borrowedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BORROWED':
            return {
                ...state,
                borrowed: action.borrowedBook,
                availableBook: action.availableBook,
                status: null
            }
        case 'RETURN_BOOK' :
            return {
                ...state,
                borrowed: action.borrowedPayload,
                status: action.status,
                returnBookName: action.returnBookName,
                lastSync: new Date()
            }
        default:
            return state
    }
}