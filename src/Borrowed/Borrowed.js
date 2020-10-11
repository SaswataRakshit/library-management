import React, { Component } from 'react';

import instance from '../instance'
import BorrowedCard from './BorrowedCard/BorrowedCard'

//*** This component is for calling borrow.json document from Firebase DB and passing response to BorrowedCard component */

class borrowed extends Component {
    state = {
        borrowedBook: [],
        loading: true
    }

    componentDidMount() {
        instance.get('/borrow.json')
            .then((response) => {
                let borrowedArray = [...this.state.borrowedBook];

                borrowedArray = response.data

                if (borrowedArray != null) {
                    borrowedArray.forEach((data) => {
                        data.type = "borrowed"
                    })
                }

                this.setState({
                    borrowedBook: borrowedArray,
                    loading: false
                })
            })
            .catch((error) => {
                alert('Oops!!! Something went wrong')
            })
    }
    render() {
        return (
            <div>
                {
                    this.state.borrowedBook != null ? <BorrowedCard
                        borrowed={this.state.borrowedBook}
                        borrowedBook={true}
                        loading={this.state.loading}
                    />
                        :
                        <BorrowedCard
                            borrowedBook={false}
                            loading={this.state.loading}
                        />
                }
            </div>
        )
    }
}

export default borrowed;