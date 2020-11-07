const express = require('express')
const app = express()
const ejs=require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const PORT= process.env.PORT || 3000;


app.get('/',(req,res)=>{
    res.render('home');
});

// Assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// set Template engine
app.use(expressLayouts)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');


app.listen(PORT, () => {
    console.log(`Server Are running at Port: ${PORT}`);
});