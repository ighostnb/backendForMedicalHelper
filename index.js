const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//! Import routes
const authRoute = require('./routes/auth');
const putRoute = require('./requests/put/put');
const postRoute = require('./requests/post/post');
const getRoute = require('./requests/get/get');
const deleteRoute = require('./requests/delete/delete');

dotenv.config();

//! Connect to database

// var connect = false;

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => {
        // connect = true;
        console.log('DB connect');
    }
);
// while (connect == false) {
//     mongoose.connect(
//         process.env.DB_CONNECT,
//         { useNewUrlParser: true },
//         () => {
//             connect = true;
//             console.log('DB connect');
//         }
//     );   
// }


//! Middleware
app.use(express.json());

//! Route middleware
app.use('/api/user', authRoute);
app.use('/api/put', putRoute);
app.use('/api/post', postRoute);
app.use('/api/get', getRoute);
app.use('/api/delete', deleteRoute);

app.listen(3000, () => console.log('Server started'));