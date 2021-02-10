import React from 'react';

import { connect } from 'react-redux'
import { addToCart } from '../Redux/Action'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Rating from '@material-ui/lab/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import addCart from '../Asset/addCart.svg'
import addedCart from '../Asset/addedCart.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: 20,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    img: {
        height: 220,
        paddingTop: '100%'
    },
    title: {
        margin: '20px 0px 20px 20px'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
}));

const BookDetailsCard = (props) => {
    const [addClick, setAddClick] = React.useState(false)
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const addCartHandler = (addedBook) => {
        if(!addClick){
        props.addToCart(addedBook)
        }
        setAddClick(true)
    }

    return (
        <Grid item lg={4}>
            <Card style={{ width: '100%' }}>
                <CardHeader
                    className={classes.title}
                    action={
                        <Rating
                            name="simple-controlled"
                            value={props.bookDetails.rating}
                        //   onChange={(event, newValue) => {
                        //     setValue(newValue);
                        //   }}
                        />
                    }
                    title={props.bookDetails.name}
                    subheader={props.bookDetails.author}
                    style={{ minHeight: '118px' }}
                />
                <CardMedia
                    className={classes.media}
                    className={classes.img}
                    image={props.bookDetails.img}
                />
                <CardActions disableSpacing>
                    {props.bookDetails.copy > 1 ?
                        <Chip label={<label data-testid="copyAvailable">Copy Available: {props.bookDetails.copy}</label>} variant="outlined" color="primary" />
                        :
                        <Chip label={<label data-testid="copyAvailable">Copy Available: {props.bookDetails.copy}</label>} variant="outlined" color="secondary" />
                    }
                    <IconButton style={{ borderRadius: '5px', height: '30px', marginLeft: '5px', marginTop: '5px' }} onClick={() => addCartHandler(props.bookDetails)}>
                        {addClick ?
                            <span style={{display: 'flex'}}>
                                <img src={addedCart} />
                                <span style={{ fontSize: '15px', marginTop: '2px' }}>
                                    Added to cart
                            </span>
                            </span> :
                            <span style={{display: 'flex'}}>
                                <img src={addCart} />
                                <span style={{ fontSize: '15px', marginTop: '2px' }}>
                                    Add to cart
                            </span>
                            </span>
                        }

                    </IconButton>
                    <Tooltip title="Read about the book">
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    </Tooltip>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            {props.bookDetails.desc}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    )
}

export default connect(null, { addToCart })(BookDetailsCard);