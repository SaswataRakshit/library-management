const initialState = {
    bookCollection: [],
    filterBookCollection: [],
    borrowedBook: [],
    lastSync: null,
    status: null
}

export const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_COLLECTION':
            return {
                ...state,
                bookCollection: action.availableBook,
                borrowedBook: action.borrowedBook,
                lastSync: new Date()
            }
        case 'FILTER_DATA':
            return {
                ...state,
                filterBookCollection: state.bookCollection.filter(el => {
                    if (el.name == action.payload) {
                        return true
                    }
                    return false
                })
            }
        case 'CLEAR_FILTER':
            return {
                ...state,
                bookCollection: action.payload,
                filterBookCollection: []
            }
        case 'BORROW_SUCCESS':
            return {
                ...state,
                bookCollection: action.payload,
                status: action.status,
                lastSync: new Date()
            }
        default:
            return state;
    }
}