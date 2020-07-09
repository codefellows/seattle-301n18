'use strict';

// Read the .env file and put any VAR=value into process.env.VAR
require('dotenv').config();

const express = require('express');
// const superagent = require('superagent');
// const pg = require('pg');
const cors = require('cors');
const morgan = require('morgan');

// Initialize Express
const app = express();

// If you want views in a different folder
// app.set('views', './potato')

// By default, it uses the './views' folder
app.set('view engine', 'ejs');

// Application Middleware (Helpers)

// CORS - Prevents the "Access to /someting denied by Cross Origin Rules" error
// Essentially: My app can be used by anyone from anywhere
app.use(cors());

// MORGAN: Request Logger - Will show us some details on every page load
app.use(morgan("dev"));

// In order to deal with a form POST ... we need to tell express that we care about it
// YES ... copy and paste this line at your lesiure
app.use(express.urlencoded({ extended: true }))


// ----------------------------------------------
// Route Definitions
// ----------------------------------------------

// i.e. http://SERVER:3000/something.html or style.css or app.js or an image
// Match any file after the '/' in the folder called '/public' near our server
// Static or non-changing content
// Static is a file.
app.use(express.static('./public'));

// ----------------------------------------------
// Below are all of hte "dynamic" routes -- meaning: they require some code to work right...
// ----------------------------------------------


// handle a "get request" for http://SERVER:3000/ ... note the /
// Runs an inline callback function
app.get('/', (req, res) => {
  // Go to google and find stuff
  // Save thing in the database
  // Do other work
  // Send out something
  res.status(200).send('This server is working');
});

// handle a "get request" for http://SERVER:3000/other-stuff ... note the /other-stuff
// Runs a named callback function
app.get('/other-stuff', handleOtherStuff);

// Simulate An Error
app.get('/bad*', (req, res) => {
  throw new Error('John is bald');
});

// our first EJS template ... just straight markup
// res.render(file)  === find the file named <file>.ejs and send it to the browser
app.get('/hi', (req, res) => {
  res.render('hello');
});

// Our second ejs template, this time with data!
// Just like mustache, .render() wants a view filename and an object
app.get('/people', (req, res) => {
  let family = ['John', 'Cathy', 'Zach', 'Allie', 'Rosie'];
  let title = "John's Family";
  res.render('thingstodo/people', { folks: family, title });
})

app.get('/register-form', (req, res) => {
  res.render('form');
});

app.get('/form-with-get', (req, res) => {
  // Express turns ?x=y&a=b into an object called req.query
  console.log(req.query);
  res.send(`Form with GET ... ${req.query.fullname}`)
});

app.post('/form-with-post', (req, res) => {
  console.log(req.body);
  res.render('john', { formdata: req.body })
});

// Any route that is not declared above will use the "Not Found" handler
app.use('*', handleNotFound);

// Any time an error is thrown, this will run
app.use(handleError);

// ----------------------------------------------
// ROUTE HANDLER FUNCTIONS
// ----------------------------------------------


// this response to the /other-stuff route
function handleOtherStuff(req, res) {
  res.status(200).send('This is john\'s playpen ... <img src="/images/playpen.png" />');
}

// handles any route that wasn't defined and gives a good messsage
function handleNotFound(req, res) {
  res.status(404).send('Could Not Find What You Asked For');
}

// 500 (catastrophic) error handler. Log it, and then tell the user
function handleError(error, req, res, next) {
  console.error(error);
  res.status(500).send('Something Bad Happened')
}


app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
