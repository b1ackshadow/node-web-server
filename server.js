const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=> new Date().getFullYear());

hbs.registerHelper('screamIt',(text)=> text.toUpperCase());
app.use((req,res,next)=>{
var now = new Date().toString();
var log = `${now} ${req.method} ${req.url}`;
console.log(log);
fs.appendFileSync('server.log',log+'\n');
next();
});
app.get('/',(req,res)=>{
    //res.send('<h1>Hello express</h1>');
    res.render('home',{
      pageTitle:'Home page',
      welcomeMessage:'Welcome to my website'
    });
});
app.get('/about',(req,res)=>{
  res.render('about',{
    pageTitle:'About page',
  });
});
app.listen(3000,()=>{
  console.log('Server is up on 3000');
});
