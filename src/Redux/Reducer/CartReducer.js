const initialState = {
    addedItems: [],
    lastTimeUpdate: new Date()
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CART':
            return {
                ...state,
                addedItems: [...state.addedItems, action.payload]
            }

        case 'REMOVE_CART':
            return {
                ...state,
                addedItems: state.addedItems.filter(el => el.name != action.payload),
                lastTimeUpdate: new Date()
            }

        default:
            return state
    }
}