require('dotenv').config();
const express = require('express')
const app = express()
const ejs=require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const mongoose=require('mongoose');
// const connection = require('./app/models/db');
const session = require('express-session');
const flash= require('express-flash');
const passport = require('passport');
const MongoDbStore = require('connect-mongo')(session);
const PORT= process.env.PORT || 3000;


// Database connection
mongoose.connect(process.env.DB, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});

// Session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

// session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))

// // Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

// using falsh

app.use(flash());

// Assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//  Globle middle ware
app.use((req,res,next)=>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// set Template engine
app.use(expressLayouts)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');

// routs
require('./routes/web')(app);


app.listen(PORT, () => {
    console.log(`Server Are running at Port: ${PORT}`);
});