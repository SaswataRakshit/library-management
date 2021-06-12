import axios from 'axios'
import instance from '../../instance'

const fetchBorrowed = () => async dispatch => {
    const response = await instance.get('./borrow.json');

    return response;
}

const fetchBook = () => async dispatch => {
    const response = await instance.get('/books.json')

    return response;
}

export const fetchCollection = () => async dispatch => {
    const borrowedBookresponse = await dispatch(fetchBorrowed())
    const availableBookResponse = await dispatch(fetchBook())

    dispatch({
        type: 'FETCH_COLLECTION',
        availableBook: availableBookResponse.data,
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

export const addToBorrowList = (borrowedBookList) => async (dispatch, getState) => {
    let addToBorrowListResponse = ''
    let borrowedBook = getState().book.borrowedBook
    if (borrowedBook.length != 0) {
        const previousBorrowedBook = borrowedBook
        const newBorrowedList = [...previousBorrowedBook]
        borrowedBookList.forEach(el => newBorrowedList.push(el))
        console.log(newBorrowedList)
        addToBorrowListResponse = await instance.put('./borrow.json', newBorrowedList)
    }
    else {
        addToBorrowListResponse = await instance.put('./borrow.json', borrowedBookList)
    }


    return addToBorrowListResponse.status
}

export const borrowedCollection = () => async dispatch => {
    const borrowedBookresponse = await dispatch(fetchBorrowed())
    const availableBookResponse = await dispatch(fetchBook())
    dispatch({
        type: 'GET_BORROWED',
        borrowedBook: borrowedBookresponse.data,
        availableBook: availableBookResponse.data
    })
}

export const returnBook = (updateBorrowed, updateAvailableBook, bookName) => async dispatch => {
    const borrowedResponse = await instance.put('./borrow.json', updateBorrowed)
    const availableBookResponse = await instance.put('/books.json', updateAvailableBook)

    dispatch({
        type: 'RETURN_BOOK',
        borrowedPayload: borrowedResponse.data,
        status: availableBookResponse.status,
        returnBookName: bookName
    })
}