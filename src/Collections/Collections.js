import React, { Component } from 'react';
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import instance from '../instance'
import CollectionCard from './CollectionCard/CollectionCard'
import { fetchCollection } from '../Redux/Action'
import BookDetailsCard from '../BookDetailsCard/BookDetailsCard'


//*** This component is for calling books.json document from Firebase DB and passing response to CollectionCard component */

class collections extends Component {
    state = {
        bookCollection: [],
        loading: true
    }

    componentDidMount() {
        this.props.fetchCollection();
        // let collectionArray = [...this.state.bookCollection];

        // console.log(this.props)
        // collectionArray = this.props.books

        // if (collectionArray != null) {
        //     collectionArray.forEach((data) => {
        //         data.type = "bookCollection"
        //     })
        // }

        // localStorage.setItem('books', JSON.stringify(this.props.books))

        // this.setState({
        //     bookCollection: collectionArray,
        //     loading: false
        // })
    }


    render() {
        return (
            <div style={{ width: 'calc(100vw - 90px)' }}>
                {/* {
                    this.props.books != null ? <CollectionCard
                        books={this.props.books}
                        booksAvailable={true}
                        loading={this.state.loading}
                    />
                        :
                        <CollectionCard
                            booksAvailable={false}
                            loading={this.state.loading}
                        />
                } */}
                <Grid container spacing={2} style={{ margin: '20px', width: 'calc(100vw - 100px)' }}>
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