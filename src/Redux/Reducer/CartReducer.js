export const cartReducer = (addedItems = [], action) => {
    switch (action.type) {
        case 'ADD_CART':
            return [...addedItems, action.payload]
        case 'REMOVE_CART':
            return addedItems.filter(el=> el.name != action.payload)
        default:
            return addedItems
    }
}