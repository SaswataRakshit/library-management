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