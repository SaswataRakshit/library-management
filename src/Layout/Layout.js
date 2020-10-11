import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Link, Route } from 'react-router-dom';

import Collections from '../Collections/Collections';
import Borrowed from '../Borrowed/Borrowed';

import layoutClass from '../Layout/Layout.module.css'

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
                <h1 data-testid="appHeading" className={layoutClass.heading}>Library Management</h1>
                <AppBar position="static">
                    <Toolbar>
                        <Link data-testid="collectionLink" to="/" className={this.state.isClickedCollections ? layoutClass.tabWrapperSelected : layoutClass.tabWrapper} style={this.tabStyle} onClick={this.homeClickHandler}>Collections</Link>
                        <Link data-testid="borrowedLink" to="/borrowed" className={this.state.isClickedBorrowed ? layoutClass.tabWrapperSelected : layoutClass.tabWrapper} style={this.tabStyle} onClick={this.borrowedClickHandler}>Borrowed</Link>
                    </Toolbar>
                </AppBar>
                <Route path="/" exact component={Collections} />
                <Route path="/borrowed" component={Borrowed} />
            </div>
        );
    }
}

export default navigationItem;