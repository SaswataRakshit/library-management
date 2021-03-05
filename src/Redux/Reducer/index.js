import {combineReducers} from 'redux'
import {bookReducer} from './BookReducer'
import {cartReducer} from './CartReducer'
import { borrowedReducer} from './BorrowedReducer'

export default combineReducers({
    book: bookReducer,
    cartItems: cartReducer,
    borrowed: borrowedReducer
})