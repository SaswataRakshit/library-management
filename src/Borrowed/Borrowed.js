import { Divider, Grid, Paper } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import './Borrowed.css'
import { borrowedCollection } from '../Redux/Action'
import BorrowedCard from './BorrowedCard/BorrowedCard'

const Borrowed = (props) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.borrowedBook)

    useEffect(() => {
        dispatch(borrowedCollection())
    }, [])

    return (
        <div style={{ width: 'calc(100vw - 68px)' }}>
            <Paper elevation={0} className="headingPaper">
                <h3 className="heading">Borrowed Books</h3>
                <Divider style={{ marginTop: '12px' }} />
            </Paper>
            <Grid container spacing={2} style={{ margin: '20px', width: 'calc(100vw - 100px)', marginTop: '80px' }}>
                <Fragment>{state.borrowed.map(book => <BorrowedCard key={book.id} bookDetails={book} /> )}</Fragment>
            </Grid>
        </div>
    )
}

export default Borrowed;