export const bookReducer = (bookCollection = [], action) => {
    switch(action.type){
        case 'FETCH_COLLECTION':
            return action.payload
        default:
            return bookCollection
    }
}