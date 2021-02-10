export const cartReducer = (addedItems = [], action) => {
    switch (action.type) {
        case 'ADD_CART':
            return [...addedItems, action.payload]
        default:
            return addedItems
    }
}