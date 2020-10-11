import React, { Component } from 'react';

import instance from '../instance'
import CollectionCard from './CollectionCard/CollectionCard'


//*** This component is for calling books.json document from Firebase DB and passing response to CollectionCard component */

class collections extends Component {
    state = {
        bookCollection: [],
        loading: true
    }

    componentDidMount() {
        instance.get('/books.json')
            .then((response) => {
                let collectionArray = [...this.state.bookCollection];

                collectionArray = response.data

                if (collectionArray != null) {
                    collectionArray.forEach((data) => {
                        data.type = "bookCollection"
                    })
                }

                localStorage.setItem('books', JSON.stringify(response.data))

                this.setState({
                    bookCollection: collectionArray,
                    loading: false
                })
            });
    }


    render() {
        return (
            <div>
                {
                    this.state.bookCollection != null ? <CollectionCard
                        books={this.state.bookCollection}
                        booksAvailable={true}
                        loading={this.state.loading}
                    />
                        :
                        <CollectionCard
                            booksAvailable={false}
                            loading={this.state.loading}
                        />
                }
            </div>
        )
    }
}

export default collections;