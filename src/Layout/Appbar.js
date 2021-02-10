import React, { Component } from 'react';

import {connect} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import layoutClass from '../Layout/Layout.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

//*** This Component is for Navigation and Header of the application ***
class navigationItem extends Component {
    state = {
        isClickedCollections: true,
        isClickedBorrowed: false
    }

    useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        }
    }));

    classes = this.useStyles;

    tabStyle = {
        paddingLeft: "16px",
        marginTop: "10px"
    }

    homeClickHandler = () => {
        this.setState({
            isClickedCollections: true,
            isClickedBorrowed: false
        })
    }

    borrowedClickHandler = () => {
        this.setState({
            isClickedCollections: false,
            isClickedBorrowed: true,
        })
    }

    render() {
        return (
            <div className={this.classes.root}>
                <AppBar position="fixed">
                    <div style={{display: 'flex'}}>
                        <h2 data-testid="appHeading" className={layoutClass.heading}>Library Management</h2>
                        <div style={{ flexGrow: '1' }} />
                        <FontAwesomeIcon icon={faShoppingCart} className="icon" style={{ cursor: 'pointer', color: 'white', marginRight: '2px', marginTop: '17px' }} />
                        {this.props.addedItem.length != 0 ? <span className={layoutClass.itemsInCard}>{this.props.addedItem.length}</span> : null}
                    </div>
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {addedItem: state.cartItems}
}

export default connect(mapStateToProps)(navigationItem);