import React from 'react'

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import layoutClass from '../Layout/Layout.module.css'


const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginTop: '40px',
        backgroundColor: '#FEFEFA'
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(5) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
        marginTop: '40px',
        backgroundColor: '#FEFEFA'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                {open ?
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                    :
                    <IconButton onClick={handleDrawerOpen}>
                        <ChevronRightIcon />
                    </IconButton>
                }
            </div>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon><FontAwesomeIcon icon={faBook} className="icon" style={{ cursor: 'pointer', color: '#909090' }} /></ListItemIcon>
                    <ListItemText primary={<Link data-testid="collectionLink" to="/" className={layoutClass.listItem}>Collections</Link>} style={{ marginLeft: '-15px' }} />
                </ListItem>
            </List>

            <Divider />

            <List>
                <ListItem button>
                    <ListItemIcon><FontAwesomeIcon icon={faBookOpen} className="icon" style={{ cursor: 'pointer', color: '#909090' }} /></ListItemIcon>
                    <ListItemText primary={<Link data-testid="borrowedLink" to="/borrowed" className={layoutClass.listItem}>Borrowed</Link>} style={{ marginLeft: '-15px' }} />
                </ListItem>
            </List>
        </Drawer>
    )
}

export default Navbar;