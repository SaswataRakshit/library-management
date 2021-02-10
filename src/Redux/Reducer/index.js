import {combineReducers} from 'redux'
import {bookReducer} from './BookReducer'
import {cartReducer} from './CartReducer'

export default combineReducers({
    book: bookReducer,
    cartItems: cartReducer
})