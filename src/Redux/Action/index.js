import instance from '../../instance'

export const fetchCollection = () => async dispatch => {
    const borrowedBookresponse = await dispatch(fetchBorrowed())
    const response = await instance.get('/books.json')

    dispatch({
        type: 'FETCH_COLLECTION',
        availableBook: response.data,
        borrowedBook: borrowedBookresponse.data
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

export const borrowBooks = (afterBorrowBookList, addedBookList) => async (dispatch) => {
    const addBorrowStatus = await dispatch(addToBorrowList(addedBookList))
    if (addBorrowStatus == 200) {
        const response = await instance.put('/books.json', afterBorrowBookList)
        dispatch({
            type: 'BORROW_SUCCESS',
            payload: response.data,
            status: response.status
        })
    }
}

export const addToBorrowList = (borrowedBookList) => async dispatch => {
    let addToBorrowListResponse = ''
    const response = await dispatch(fetchBorrowed())
    if(response.data != null){
    const previousBorrowedBook = response.data
    const newBorrowedList = [...previousBorrowedBook]
    borrowedBookList.forEach(el=> newBorrowedList.push(el))
    console.log(newBorrowedList)
    addToBorrowListResponse = await instance.put('./borrow.json', newBorrowedList)
    }
    else{
        addToBorrowListResponse = await instance.put('./borrow.json', borrowedBookList)
    }


    return addToBorrowListResponse.status
}

const fetchBorrowed = () => async dispatch => {
    const response = await instance.get('./borrow.json');

    return response;
}

export const borrowedCollection = () => async dispatch => {
    console.log("************")
    const response = await dispatch(fetchBorrowed())

    dispatch({
        type: 'GET_BORROWED',
        payload: response.data
    })
}