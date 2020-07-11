'use strict';

// pull in env variables
require('dotenv').config();

// declare a port to use
const PORT = process.env.PORT;

// bring in our dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const morgan = require('morgan');


// start our app
const app = express();
const client = new pg.Client(process.env.DATABASE_URL);

// start morgan
app.use(morgan('dev'));

// CORS
app.use( cors() );

// gives us a public folder
app.use(express.static('./public'));

// EJS - allows us to use EJS
app.set('view engine', 'ejs');

// parses our POST request
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', allTasksHandler);
app.get('/details/:task_id', getDetailHandler);
app.get('/add', showForm);

app.post('/add', addTask);


app.get('*', notfoundHandler);

// Handler functions
function allTasksHandler(req, res) {
  let SQL = `SELECT * FROM tasks`;

  return client.query(SQL)
    .then(results => {
      console.log(results.rows);
      res.render('index', {rowResults: results.rows});
    })
    .catch(error => handleError(error, res));
}

function notfoundHandler(req, res) {
  res.status(404).send('An error has occurred')
}

function showForm(req, res){
  res.render('./pages/form')
}

function addTask(req, res) {
  console.log(req.body);
  let SQL = `INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *`;

  let param = [req.body.title, req.body.description, req.body.status];

  client.query(SQL, param)
    .then( () => {
      res.redirect('/')
    })
}


function handleError(error, res){
  console.log(error)
  res.render('./pages/error', { error: 'Uh-oh'});
}

function getDetailHandler(req, res){
  console.log(req.params)
  let SQL = `SELECT * FROM tasks WHERE id = $1`;
  let param = [req.params.task_id];

  client.query(SQL, param)
    .then(results => {
      console.log(results.rows[0]);
      res.render('./pages/details', {task: results.rows[0]})
    })
}

// connect to our database + start our server
client.connect(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
  })
})