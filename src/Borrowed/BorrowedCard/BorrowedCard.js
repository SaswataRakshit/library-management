import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Card, CardActions, CardHeader, CardMedia, Grid, IconButton, makeStyles, Snackbar } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import read from '../../Asset/read.svg'
import { returnBook } from '../../Redux/Action'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: 20,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    img: {
        height: 220,
        paddingTop: '100%'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
}));

const CollectionCard = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const state = useSelector(state => state.borrowedBook)
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (state.status != null) {
            handleClick()
        }
    }, [state.lastSync])

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const cardDetails = (
        <Grid container spacing={0}>
            <Grid item lg={2} sm={1} xs={1}>
                <img src={props.bookDetails.img} style={{ width: '60px', height: '120px' }} />
            </Grid>
            <Grid item lg={8} sm={6} xs={6}>
                <span>{props.bookDetails.name}</span>
                <p className="authorName">{props.bookDetails.author}</p>
            </Grid>
        </Grid>
    )

    const returnBookHandler = (bookName) => {
        let availableBook = [...state.availableBook]
        let afterReturnBookCollection = state.borrowed.filter(el => el.name != bookName)
        let changeAvailableBook = availableBook.filter(el => el.name == bookName)
        changeAvailableBook.forEach(el => {
            el.copy = el.copy + 1;
            availableBook[el.id] = el
        })
        dispatch(returnBook(afterReturnBookCollection, availableBook, bookName))
    }
    return (
        <Grid item lg={4}>
            <Card style={{ width: '100%' }}>
                <CardHeader
                    title={cardDetails}
                    style={{ minHeight: '88px', paddingBottom: '0px' }}
                />
                <CardActions disableSpacing style={{ paddingTop: '0px', float: 'right' }}>
                    <IconButton style={{ borderRadius: '5px' }} onClick={() => returnBookHandler(props.bookDetails.name)}>
                        <FontAwesomeIcon icon={faUndoAlt} className="icon" style={{ cursor: 'pointer', color: '#909090', height: '12px', width: '12px' }} />
                        <span style={{ fontSize: '14px', paddingLeft: '5px' }}>Return Book</span>
                    </IconButton>
                    <IconButton style={{ borderRadius: '5px' }}>
                        <img src={read} />
                        <span style={{ fontSize: '14px', paddingLeft: '5px' }}>Read Book</span>
                    </IconButton>
                </CardActions>
            </Card>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                {state.status == 200 ?
                    <Alert onClose={handleClose} severity="success">
                        Successfully Returned Book : {state.returnBookName}
                    </Alert>
                    :
                    <Alert onClose={handleClose} severity="error">
                        Oops! Something went wrong!
                    </Alert>
                }
            </Snackbar>
        </Grid>
    )
}

export default CollectionCard;