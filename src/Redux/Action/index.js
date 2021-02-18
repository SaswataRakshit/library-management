import instance from '../../instance'

export const fetchCollection = () => async dispatch => {
    const response = await instance.get('/books.json')

    dispatch({
        type: 'FETCH_COLLECTION',
        payload: response.data
    })
}

export const addToCart = (addedItem) => {
    return {
        type: 'ADD_CART',
        payload: addedItem
    }
}

export const removeFromCart = (removeItem) => {
    return {
        type: 'REMOVE_CART',
        payload: removeItem
    }
}

export const filterData = (value) => {
    return {
        type: 'FILTER_DATA',
        payload: value
    }
}

export const clearFilterAction = (oldState) => {
    return {
        type: 'CLEAR_FILTER',
        payload: oldState
    }
}

export const borrowBooks = (afterBorrowBookList) => async (dispatch) => {
    const response = await instance.put('/books.json', afterBorrowBookList)
    dispatch({
        type: 'BORROW_SUCCESS',
        payload: response.data,
        status: response.status
    })
}