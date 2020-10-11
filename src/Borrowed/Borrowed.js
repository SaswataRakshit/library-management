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

    minusClick = (returnBookDetails) => {
        console.log(returnBookDetails)
        instance.get('/borrow.json')
            .then((response) => {
                if (response.data.length != 0) {
                    let updateBookDetails = []
                    let borrowedArray = response.data
                    let id = borrowedArray.findIndex(x => x.id == returnBookDetails.id)

                    let borrowRemained = this.remove(borrowedArray, id);

                    let savedBooks = localStorage.getItem('books')
                    let bookDetails = JSON.parse(savedBooks);

                    let isPresent = this.containsObject(returnBookDetails, bookDetails)

                    instance.put('/borrow.json', borrowRemained)
                        .then((response) => {
                            this.setState({
                                borrowedBook: response.data
                            })
                            if (isPresent) {
                                let bookDetailsId = bookDetails.findIndex(x => x.id == returnBookDetails.id)
                                updateBookDetails = this.add(bookDetails, bookDetailsId)
                                instance.put('/books.json', updateBookDetails)
                                    .then((response) => {
                                        if (response.status == 200) {
                                            alert("You have returned book: " + returnBookDetails.name + " successfully!!")
                                        }
                                    })
                                    .catch((error) => {
                                        alert('Oops!!! Something went wrong')
                                    })
                            }
                            else {
                                returnBookDetails.copy = 1
                                bookDetails.push(returnBookDetails)
                                updateBookDetails = bookDetails
                                instance.put('/books.json', updateBookDetails)
                                    .then((response) => {
                                        if (response.status == 200) {
                                            alert("You have returned book: " + returnBookDetails.name + " successfully!!")
                                        }
                                    })
                                    .catch((error) => {
                                        alert('Oops!!! Something went wrong')
                                    })
                            }
                        })
                }
            })
    }

    remove = (arr, id) => {
        arr.splice(id, 1)
        return arr;
    }

    containsObject = (obj, list) => {
        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i].id === obj.id) {
                return true;
            }
        }
        return false;
    }

    add = (arr, id) => {
        let returnBook = arr.splice(id, 1)
        const copy = returnBook[0].copy
        let afterReturningCopy = copy + 1
        returnBook[0].copy = afterReturningCopy
        arr.splice(id, 0, returnBook[0])
        return arr
    }

    render() {
        return (
            <div>
                {
                    this.state.borrowedBook != null ? <BorrowedCard
                        borrowed={this.state.borrowedBook}
                        borrowedBook={true}
                        loading={this.state.loading}
                        click={(returnBookDetails) => this.minusClick(returnBookDetails)}
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