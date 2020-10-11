import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid'

import './CollectionCard.css'
import loading from '../../Asset/32.gif'
import Cards from '../../Cards/Cards'

//** This Component is for basic layout of the available Book Collection page. Also it is passing props to Cards component*/

const Accordion = withStyles({
    root: {
        border: '0px solid rgb(227, 227, 228) ',
        borderRadius: '10px',
        width: '99%',
        marginRight: '10%',
        fontFamily: 'Roboto',
        background: 'rgb(247, 247, 247)',
    }

})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        background: 'rgb(247, 247, 247)',
        border: '1px rgb(221, 221, 221)',
        borderRadius: '10px',
        paddingLeft: '5px',
        fontFamily: 'Roboto',
        '&$expanded': {
            minHeight: 56,

        },
        height: '53px',
        width: '90%',
        textAlign: 'auto'
    },

    expandIcon: {
        order: -1,
        transform: 'rotate(270deg)',
        color: 'black',
        "&$expanded": {
            transform: "rotate(360deg)"
        }
    },

    content: {
        '&$expanded': {
            margin: '0',

        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        background: 'rgb(247, 247, 247)',
        borderRadius: '10px',
        border: '0px solid rgb(221, 221, 221)',
        height: 'auto',
        width: '90%',


    }
}))(MuiAccordionDetails);


const CollectionCard = (props) => {
    const [expanded, setExpanded] = React.useState(true);

    const loadImgStyle = {
        marginLeft: '700px',
        height: '100px',
        width: '120px',
        marginTop: '20px'
    }
    const loadingStyle = {
        marginLeft: '720px',
        marginTop: '0px'
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        < div >
            {props.loading ?
                <div><img src={loading} alt="Loading" style={loadImgStyle}></img>
                    <p data-testid="loadingBook" style={loadingStyle}>Loading...</p></div>
                :
                <div>
                    {props.booksAvailable == true ?
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{ marginTop: '40px', left: '40px', width: '95%' }}>
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <span>
                                    <label data-testid="collectionHeading" className="accordianHeading"> BOOK COLLECTIONS</label>
                                </span>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2} style={{ marginLeft: '30px', marginTop: '6px' }}>
                                    {props.books.map((data, index) =>
                                        <Cards
                                            key={index}
                                            name={data.name}
                                            author={data.author}
                                            desc={data.desc}
                                            copy={data.copy}
                                            allDetails={data}
                                            display={data.type}
                                            click={false}
                                            img={data.img}
                                        />
                                    )}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        :
                        <h3 style={{ marginLeft: '40px', color: 'red' }}>No Book is available to borrow!!!</h3>
                    }
                </div>}
        </div >
    )
}

export default CollectionCard;