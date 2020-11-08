const express = require('express')
const app = express()
const ejs=require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const PORT= process.env.PORT || 3000;

// Assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// set Template engine
app.use(expressLayouts)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');

// routs
app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/cart',(req,res)=>{
    res.render('costomer/cart');
});

app.get('/login',(req,res)=>{
    res.render('auth/login');
});

app.get('/register',(req,res)=>{
    res.render('auth/register');
});


app.listen(PORT, () => {
    console.log(`Server Are running at Port: ${PORT}`);
});