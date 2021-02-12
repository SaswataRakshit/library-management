import React, { Component } from 'react';
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import BookDetailsCard from '../BookDetailsCard/BookDetailsCard'
import Paper from '@material-ui/core/Paper';
import { Divider, IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';

import './Collections.css'
import { fetchCollection } from '../Redux/Action'


//*** This component is for calling books.json document from Firebase DB and passing response to CollectionCard component */

class collections extends Component {
    state = {
        bookCollection: [],
        loading: true,
        openFilter: false,
        suggestions: []
    }

    componentDidMount() {
        this.props.fetchCollection();
    }

    applyFilter = (e) => {
        let value = e.target.value
        let suggestionArray = []
        if (value) {
            this.props.books.filter(el => {
                if (String(el.name).includes(value.toUpperCase()) || String(el.name).includes(value.toLowerCase())) {
                    console.log(el.name)
                    suggestionArray.push(el.name)
                    return true
                }
                if (String(el.author).includes(value.toUpperCase()) || String(el.author).includes(value.toLowerCase())) {
                    console.log(el.author)
                    suggestionArray.push(el.author)
                    return true
                }
                return false
            })
            this.setState({
                suggestions: suggestionArray
            })
        }
        else {
            this.setState({
                suggestions: []
            })
        }
    }

    filterClickHandler = () => {
        let openStatus = this.state.openFilter
        this.setState({
            openFilter: !openStatus
        })
    }


    render() {
        console.log(this.state.suggestions)
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
                                <IconButton onClick={this.filterClickHandler} style={{ height: '16px', width: '16px', marginRight: '100px', marginTop: '25px', marginLeft: '-15px' }}>
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
                    <Divider style={{ marginTop: '12px' }} />
                </Paper>
                <Grid container spacing={2} style={{ margin: '20px', width: 'calc(100vw - 100px)', marginTop: '80px' }}>
                    {this.props.books.map(book => <BookDetailsCard key={book.id} bookDetails={book} />)}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { books: state.book }
}

export default connect(mapStateToProps, { fetchCollection })(collections);