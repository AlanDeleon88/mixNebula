//import packages
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf'); // csurf protection
const helmet = require('helmet'); //security middleware
const cookieParser = require('cookie-parser');

//set environment and check production
const { environment } = require('./config');
const isProduction = environment === 'production';


//init express
const app  = express();

//import routes
const routes = require('./routes');

// import validation error handler
const { ValidationError } = require('sequelize');

//init morgan middleware logging information about server request/responses
app.use(morgan('dev'));
//init cookieParser middleware parsing cookies from requests
app.use(cookieParser());
//init express middleware for json body parsing.
app.use(express.urlencoded({extended: false}))
app.use(express.json());

//Security middleware
if(!isProduction) {
    app.use(cors());
}
//init helmet security
app.use(
    helmet.crossOriginResourcePolicy({
        policy : 'cross-origin'
    })
);

//set csrf token and create req.csrf method
app.use( //! need to ask about how this works. not sure if its supposed to reject request without the xsrf token.
    csurf({
        cookie : {
            secure : isProduction,
            sameSite : isProduction && 'Lax',
            httpOnly : true
        }
    })
);

//test route
app.use(routes)

//rerource-not found middleware
//! catch all for any route not defined in routes will hit as the next middleware if none of the route handlers catch the request, different from the
//! two error handler middle ware below because it only has 3 params.
app.use((_req, _res, next) => {

    const err = new Error("The requsted resources couldn't be found.");
    err.title = 'Resource Not Found';
    err.errors = ["The requested resources couldn't be found"];
    err.status = 404;
    next(err);
})

// Process sequelize errors
app.use((err, _req, _res, next) =>{
    if(err instanceof ValidationError){
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
});

// Error formatter

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title : err.title || 'Server Error',
        message : err.message,
        errors : err.errors,
        statusCode : err.status,
        stack : isProduction ? null : err.stack
    });
});

module.exports = app;
