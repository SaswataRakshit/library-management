import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux'
import { addToCart } from '../Redux/Action'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Rating from '@material-ui/lab/Rating';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import addCart from '../Asset/addCart.svg'
import addedCart from '../Asset/addedCart.svg'
import './BookDetailsCard.css'

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
    title: {
        //margin: '20px 0px 20px 20px'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const BookDetailsCard = (props) => {
    const [addClick, setAddClick] = useState(false)
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const [showRepeatError, setShowRepeatError] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const addCartHandler = (addedBook) => {
        console.log(props.addedItems.filter(el => el.name == addedBook.name))
        if (props.addedItems.filter(el => el.name == addedBook.name).length != 0) {
            handleClick()
            setShowRepeatError(true)
        }
        else if (props.addedItems.length > 3) {
            handleClick()
            setShowRepeatError(false)
        }
        else {
            props.addToCart(addedBook)
            setAddClick(true)
            setShowRepeatError(false)
        }
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Grid item lg={4}>
            <Card style={{ width: '100%' }}>
                <CardHeader
                    className={classes.title}
                    action={
                        <Rating
                            name="simple-controlled"
                            value={props.bookDetails.rating}
                        //   onChange={(event, newValue) => {
                        //     setValue(newValue);
                        //   }}
                        />
                    }
                    title={<span style={{ fontSize: 'medium' }}>{props.bookDetails.name}</span>}
                    subheader={<span style={{ fontSize: 'small' }}>{props.bookDetails.author}</span>}
                    style={{ minHeight: '88px' }}
                />
                <CardMedia
                    className={classes.media}
                    className={classes.img}
                    image={props.bookDetails.img}
                />
                <CardActions disableSpacing>
                    {props.bookDetails.copy > 1 ?
                        <Chip label={<label data-testid="copyAvailable">Copy Available: {props.bookDetails.copy}</label>} variant="outlined" color="primary" />
                        :
                        <Chip label={<label data-testid="copyAvailable">Copy Available: {props.bookDetails.copy}</label>} variant="outlined" color="secondary" />
                    }
                    <IconButton className="addToCart" style={{ borderRadius: '5px', height: '30px', marginLeft: '5px', marginTop: '5px' }} onClick={() => addCartHandler(props.bookDetails)}>
                        <span style={{ display: 'flex', marginRight: '5px' }}>
                            <img src={addCart} />
                            <span style={{ fontSize: '15px', marginTop: '2px' }}>
                                Add to cart
                            </span>
                        </span>
                    </IconButton>
                    <Tooltip title="Read about the book">
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    </Tooltip>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            {props.bookDetails.desc}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                {showRepeatError ?
                    <Alert onClose={handleClose} severity="error">
                        User cannot add same item twice in cart
                    </Alert>
                    :
                    <Alert onClose={handleClose} severity="error">
                        User can add maximum 4 items in cart
                    </Alert>
                }
            </Snackbar>
        </Grid>
    )
}

const mapStateToProp = (state) => {
    return { addedItems: state.cartItems.addedItems, lastTimeUpdate: state.cartItems.lastTimeUpdate }
}

export default connect(mapStateToProp, { addToCart })(BookDetailsCard);