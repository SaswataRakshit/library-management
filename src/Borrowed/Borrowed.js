import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { borrowedCollection } from '../Redux/Action'

const Borrowed = (props) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.borrowed)

    console.log(state)

    useEffect(() => {
        dispatch(borrowedCollection())
    }, [])

    return (
        <div>
            Borrowed Work
        </div>
    )
}

export default Borrowed;