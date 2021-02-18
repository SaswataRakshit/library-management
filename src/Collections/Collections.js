import React, { Component } from 'react';
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import BookDetailsCard from '../BookDetailsCard/BookDetailsCard'
import Paper from '@material-ui/core/Paper';
import { Divider, IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';

import './Collections.css'
import { fetchCollection, filterData, clearFilterAction } from '../Redux/Action'


//*** This component is for calling books.json document from Firebase DB and passing response to CollectionCard component */

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Collections extends Component {
    state = {
        bookCollection: [],
        loading: true,
        openFilter: false,
        suggestion: null,
        anchorEl: null,
        open: false
    }

    componentDidMount() {
        this.props.fetchCollection();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lastSync != this.props.lastSync) {
            this.setState({
                bookCollection: this.props.books
            })
            if(this.props.status == 200) {
                this.setState({
                    open: true
                })
            }
        }
    }

    applyFilter = (e) => {
        let value = e.target.value
        let suggestionArray = []
        let displaySuggestion = null
        if (value) {
            this.props.books.filter(el => {
                let bookName = el.name.toLowerCase();
                if (bookName.includes(value.toLowerCase())) {
                    suggestionArray.push({
                        name: el.name,
                        author: el.author,
                        img: el.img
                    })
                    return true
                }
                return false
            })
            this.props.books.filter(el => {
                let bookAuthor = el.author.toLowerCase()
                if (bookAuthor.includes(value.toLowerCase())) {
                    suggestionArray.push({
                        name: el.name,
                        author: el.author,
                        img: el.img
                    })
                    return true
                }
                return false
            })
            if (suggestionArray.length != 0) {
                displaySuggestion = (
                    <div style={{ marginLeft: '65%' }}>
                        <Paper elevation={3} style={{ maxWidth: '85%', maxHeight: '400px', overflowY: 'scroll' }}>
                            {suggestionArray.map((el, id) => {
                                return (<div key={id}>
                                    <List component="nav">
                                        <ListItem button onClick={(data) => this.filterData(el.name)}>
                                            <ListItemText>
                                                <Grid container spacing={0}>
                                                    <Grid item lg={2} sm={1} xs={1}>
                                                        <img src={el.img} style={{ width: '60px', height: '90px' }} />
                                                    </Grid>
                                                    <Grid item lg={8} sm={6} xs={6}>
                                                        <span>{el.name}</span>
                                                        <p className="authorName">{el.author}</p>
                                                    </Grid>
                                                </Grid>
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                </div>)
                            })}
                        </Paper>
                    </div>
                )
            }

            this.setState({
                suggestion: displaySuggestion
            })
        }
        else {
            this.setState({
                suggestion: null
            })
            this.clearFilter()
        }
    }

    filterData = (value) => {
        this.props.filterData(value)
        this.setState({
            suggestion: null
        })
    }

    clearFilter = () => {
        this.props.clearFilterAction(this.state.bookCollection)
        this.setState({
            suggestion: null
        })
        this.filterClickHandler()
    }

    filterClickHandler = () => {
        let openStatus = this.state.openFilter
        this.setState({
            openFilter: !openStatus
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }


    render() {
        return (
            <div style={{ width: 'calc(100vw - 68px)' }}>
                <Paper elevation={0} className="headingPaper">
                    <div style={{ display: 'flex' }}>
                        <h3 className="heading">Available Books</h3>
                        <div style={{ flexGrow: '1' }} />
                        {this.state.openFilter ?
                            <div>
                                <TextField
                                    style={{ marginTop: '20px' }}
                                    id="input-with-icon-textfield"
                                    placeholder="Filter"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FontAwesomeIcon icon={faFilter} className="icon" style={{ color: '#909090' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={this.applyFilter}
                                />
                                <IconButton onClick={this.filterClickHandler} style={{ height: '16px', width: '16px', marginRight: '100px', marginTop: '25px', marginLeft: '-15px' }} onClick={this.clearFilter}>
                                    <FontAwesomeIcon icon={faTimes} className="icon" style={{ color: '#909090', height: '12px', width: '12px' }} />
                                </IconButton>
                            </div> :
                            <div style={{ marginRight: '100px', marginTop: '23px' }}>
                                <IconButton onClick={this.filterClickHandler} style={{ height: '18px', width: '18px' }}>
                                    <FontAwesomeIcon icon={faFilter} className="icon" style={{ color: '#909090', height: '16px', width: '16px' }} />
                                </IconButton>
                            </div>
                        }
                    </div>
                    {this.state.suggestion}
                    <Divider style={{ marginTop: '12px' }} />
                </Paper>
                <Grid container spacing={2} style={{ margin: '20px', width: 'calc(100vw - 100px)', marginTop: '80px' }}>
                    {this.props.books.map(book => <BookDetailsCard key={book.id} bookDetails={book} />)}
                </Grid>
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                {this.props.status == 200 ?
                    <Alert onClose={this.handleClose} severity="success">
                        You have borrowed book successfully
                    </Alert>
                    :
                    <Alert onClose={this.handleClose} severity="error">
                        Oops! Something went wrong
                    </Alert>
                }
            </Snackbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { books: state.book.bookCollection, lastSync: state.book.lastSync, status: state.book.status }
}

export default connect(mapStateToProps, { fetchCollection, filterData, clearFilterAction })(Collections);