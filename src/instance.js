import axios from 'axios';

//creating instance to call firebase db
export default axios.create({
    baseURL: 'https://library-management-1b907.firebaseio.com/'
})