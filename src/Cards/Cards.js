import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheckCircle, faMinus } from '@fortawesome/free-solid-svg-icons';
import Chip from '@material-ui/core/Chip';

import instance from '../instance'
import './Cards.css'

//** This comopnet is for displaying different book details inside cards based on the props it is getting from other components. Also using this component borrow and return functionality is implemented */

const useStyles = makeStyles({
    bookCollectioncard: {
        position: 'relative',
        width: '1325px',
        height: '440px',
        background: '1px solid rgb(255, 255, 255)',
        borderRadius: '5px',
        border: '5px',
        marginBottom: '30px',
        paddingRight: '10px',
        marginRight: '20px'
    },

    borrowedcard: {
        position: 'relative',
        maxWidth: '1325px',
        minWidth: '264px',
        height: '290px',
        background: '1px solid rgb(255, 255, 255)',
        borderRadius: '5px',
        border: '5px',
        marginBottom: '30px',
        paddingRight: '10px',
        marginRight: '20px'
    },

    title: {
        width: '100%',
        height: '38px',
        color: 'rgb(26, 26, 26)',
        fontSize: '16px',
        fontWeight: 500,
        letterSpacing: '0.03px',
        lineHeight: '22px',
        paddingTop: '20px'

    },
    description: {
        width: '500px',
        height: '20px',
        color: 'rgb(26, 26, 26)',
        fontSize: '14px',
        fontWeight: '300',
        letterSpacing: '0.03px',
        lineHeight: '19px',
    },

});

const CardComponent = (props) => {
    const [addClicked, setAddClicked] = useState(props.click)
    const [copy, setCopy] = useState(props.copy)
    const classes = useStyles();

    //** This function is calling on plus button click in available book page */
    const plusIconClick = () => {
        setAddClicked(!addClicked)
        //***uncomment below line to run test case "decrease copy available"***
        //setCopy(copy - 1)

        //***Comment below line to run test case "decrease copy available"***
        let savedBooks = localStorage.getItem('books')
        let bookDetails = JSON.parse(savedBooks);

        let newBookDetails = [];

        let id = bookDetails.findIndex(x => x.id == props.allDetails.id)

        newBookDetails = removeFromAvailable(bookDetails, id);

        localStorage.setItem('books', JSON.stringify(newBookDetails))

        instance.get('/borrow.json')
            .then((response) => {
                if (response.data == null) {
                    let saveBorrow = []
                    saveBorrow.push(props.allDetails)

                    instance.put('/books.json', newBookDetails)
                        .then((bookResponse) => {
                            if (bookResponse.status == 200) {
                                instance.put('/borrow.json', saveBorrow)
                                    .then((borrowResponse) => {
                                        if (borrowResponse.status == 200) {
                                            alert('YOU HAVE SUCCESSFULLY BORROWED: ' + props.allDetails.name)
                                            setCopy(copy - 1)
                                        }
                                    })
                                    .catch((error) => {
                                        alert('Oops!!! Something went wrong')
                                    })
                            }
                        })
                        .catch((error) => {
                            alert('Oops!!! Something went wrong')
                        })
                }
                if (response.data != null) {
                    const borrowedArray = response.data
                    let previousBorrow = false

                    for (let i = 0; i < borrowedArray.length; i++) {
                        if (borrowedArray[i].id == props.allDetails.id) {
                            setAddClicked(false);
                            alert('You have borrowed a copy of the same book. Please select a different book.')
                            previousBorrow = true
                            break;
                        }
                    }

                    if (!previousBorrow) {
                        if (borrowedArray.length == 2) {
                            setAddClicked(false);
                            alert('User can borrow maximum 2 books. Please go to Borrowed page to Return.')
                        }
                        else {
                            borrowedArray.push(props.allDetails)
                            instance.put('/books.json', newBookDetails)
                                .then((bookResponse) => {
                                    if (bookResponse.status == 200) {
                                        instance.put('/borrow.json', borrowedArray)
                                            .then((borrowResponse) => {
                                                if (borrowResponse.status == 200) {
                                                    alert('YOU HAVE SUCCESSFULLY BORROWED: ' + props.allDetails.name)
                                                    setCopy(copy - 1)
                                                }
                                            })
                                            .catch((error) => {
                                                alert('Oops!!! Something went wrong')
                                            })
                                    }
                                })
                                .catch((error) => {
                                    alert('Oops!!! Something went wrong')
                                })
                        }
                    }
                }
            })
            .catch((error) => {
                alert('Oops!!! Something went wrong')
            })
    }

    function removeFromAvailable(arr, id) {
        let borrowedBook = arr.splice(id, 1)
        const copy = borrowedBook[0].copy
        if (copy > 1) {
            let afterBorrowedCopy = copy - 1
            borrowedBook[0].copy = afterBorrowedCopy
            arr.splice(id, 0, borrowedBook[0])
        }
        return arr;
    }

    return (
        <div style={{ paddingRight: '50px', width: '90%' }} data-testid="bookName">
            {props.display == "bookCollection" ?
                <Card className={classes.bookCollectioncard}>
                    {!addClicked ?
                        <div className="tooltip" data-testid="addButton" onClick={plusIconClick}>
                            <FontAwesomeIcon icon={faPlus} className="icon" style={{ float: 'right', marginTop: '10px', cursor: 'pointer' }} />
                            <span className="tooltiptext">Click to borrow book</span>
                        </div>
                        :
                        <FontAwesomeIcon icon={faCheckCircle} color='green' style={{ float: 'right', marginTop: '10px', cursor: 'no-drop' }} />
                    }

                    <CardContent style={{ paddingTop: '20px', display: 'flex' }}>
                        <div data-testid="bookImage">
                            <img src={props.img} alt="bookImage" style={{ width: '200px', height: '400px' }} />
                        </div>
                        <div style={{ marginLeft: '16px' }}>
                            <span data-testid="availableBookName" className={classes.title}>
                                <b>{props.name}</b>
                            </span>
                            <p data-testid="availableBookAuthor" className={classes.description}>Author: {props.author}</p>
                            <p data-testid="availableBookDesc">{props.desc}</p>
                            {copy > 1 ?
                                <Chip label={<label data-testid="copyAvailable">Copy Available: {copy}</label>} variant="outlined" color="primary" />
                                :
                                <Chip label={<label data-testid="copyAvailable">Copy Available: {copy}</label>} variant="outlined" color="secondary" />
                            }

                        </div>
                    </CardContent>
                </Card>
                : null}
            {props.display == "borrowed" ?
                <Card className={classes.borrowedcard}>
                    {!addClicked ?
                        <div className="tooltipMinus">
                            <FontAwesomeIcon icon={faMinus} className="iconMinus" style={{ float: 'right', marginTop: '10px', cursor: 'pointer' }} onClick={() => props.onClick(props.allDetails)} />
                            <span className="tooltipMinustext">Click to return book</span>
                        </div>
                        :
                        <FontAwesomeIcon icon={faCheckCircle} color='green' style={{ float: 'right', marginTop: '10px', cursor: 'no-drop' }} />
                    }

                    <CardContent style={{ paddingTop: '20px', display: 'flex' }}>
                        <div data-testid="borrowedImg">
                            <img src={props.img} alt="bookImage" style={{ width: '150px', height: '250px' }} />
                        </div>
                        <div style={{ marginLeft: '16px' }}>
                            <span data-testid="borrowedBookName" className={classes.title}>
                                <b>{props.name}</b>
                            </span>
                            <p data-testid="borrowedBookAuthorName" className={classes.description}>Author: {props.author}</p>
                        </div>
                    </CardContent>
                </Card>
                : null}
        </div>

    );
}
export default CardComponent;