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
const methodOverride = require('method-override');


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

// use our method-override
app.use(methodOverride('_method'));

// routes
app.get('/', allTasksHandler);
app.get('/details/:task_id', getDetailHandler);
app.get('/add', showForm);

app.post('/add', addTask);

app.delete('/delete/:task_id', deleteTask);
app.put('/done-task/:task_id', doneTask);
app.put('/update-task/:task_id', updateTask);

app.get('*', notfoundHandler);

// Handler functions
function allTasksHandler(req, res) {
  let SQL = `SELECT * FROM tasks`;

  return client.query(SQL)
    .then(results => {
      // console.log(results.rows);
      res.status(200).render('index', {rowResults: results.rows});
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
  // console.log(req.body);
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
  // console.log(req.params)
  let SQL = `SELECT * FROM tasks WHERE id = $1`;
  let param = [req.params.task_id];

  client.query(SQL, param)
    .then(results => {
      // console.log(results.rows[0]);
      res.render('./pages/details', {task: results.rows[0]})
    })
}

function deleteTask(req, res) {
  console.log(req.params.task_id);
  let SQL = `DELETE from tasks WHERE id = $1`;
  let values = [req.params.task_id];

  client.query(SQL, values)
    .then( results => {
      res.status(200).redirect('/');
    })
}

function doneTask(req, res) {
  let SQL = `UPDATE tasks SET status = 'done' WHERE id = $1`
  let values = [req.params.task_id];

  client.query(SQL, values)
    .then( results => {
      res.status(200).redirect('/');
    })
}

function updateTask(req, res){
  console.log(req.body);
  let SQL = `UPDATE tasks SET title = $1, description = $2`;
  let params = [req.body.task, req.body.description];

  client.query(SQL, params)
    .then( results => {
      res.status(200).redirect(`/details/${req.params.task_id}`);
    })
}

// connect to our database + start our server
client.connect(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
  })
})