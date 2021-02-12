import React, { useState } from 'react';
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@material-ui/core';

import layoutClass from '../Layout/Layout.module.css'
import { removeFromCart } from '../Redux/Action'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    }
}));

const useStyles1 = makeStyles(() => ({
    list: {
        paddingBottom: '0px'
    }
}));

const NavigationItem = (props) => {
    const classes = useStyles();
    const menuClass = useStyles1()
    const [anchorEl, setAnchorEl] = useState(null);

    const tabStyle = {
        paddingLeft: "16px",
        marginTop: "10px"
    }

    const handleClick = (event) => {
        if (props.addedItem.length != 0) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const trashIconClick = (bookName) => {
        if(props.addedItem.length == 1){
            props.removeFromCart(bookName)
            handleClose()
        }
        else{
            props.removeFromCart(bookName)
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <div style={{ display: 'flex' }}>
                    <h2 data-testid="appHeading" className={layoutClass.heading}>Library Management</h2>
                    <div style={{ flexGrow: '1' }} />
                    <FontAwesomeIcon icon={faShoppingCart}
                        style={props.addedItem.length != 0 ? { marginRight: '2px', marginTop: '12px', cursor: 'pointer', color: 'white' } : { marginRight: '30px', marginTop: '12px', cursor: 'pointer', color: 'white' }}
                        onClick={handleClick}
                    />
                    {props.addedItem.length != 0 ? <span className={layoutClass.itemsInCard}>{props.addedItem.length}</span> : null}
                </div>
                <Menu
                    classes={{ list: menuClass.list }}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    style={{ marginTop: '22px' }}
                >
                    <span style={{ paddingLeft: '8px', fontSize: 'large' }}>Items in your Cart: </span>
                    <Divider style={{ marginTop: '10px' }} />
                    {props.addedItem.map(el =>
                        <div key={el.id} style={{ display: 'flex' }}>
                            <MenuItem onClick={handleClose}>{el.name}</MenuItem>
                            <div style={{ flexGrow: '1' }} />
                            <IconButton style={{ width: '12px', height: '12px', marginTop: '6px', marginRight: '8px' }} onClick={(name) => trashIconClick(el.name)}>
                                <FontAwesomeIcon icon={faTrashAlt}
                                    className={layoutClass.trashIcon}
                                />
                            </IconButton>
                        </div>
                    )}
                    <Button variant="contained" style={{ marginTop: '10px', backgroundColor: '#ffe135', width: '100%', borderRadius: '0px' }}>Checkout</Button>
                </Menu>
            </AppBar>
        </div>
    );
}

const mapStateToProps = (state) => {
    return { addedItem: state.cartItems }
}

export default connect(mapStateToProps, { removeFromCart })(NavigationItem);