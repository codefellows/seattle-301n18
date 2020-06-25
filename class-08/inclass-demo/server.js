'use strict';

// create a server!

// bring in our libraries (express, dotenv, cors, pg)
const express = require('express');
const cors = require('cors');
const pg = require('pg');
require('dotenv').config();

// Create our port variable from our .env file
const PORT = process.env.PORT || 3000;

// Create our app
const app = express();
const client = new pg.Client(process.env.POSTGRES);

// Enable CORS
app.use( cors() );

// Routes
app.get('/', (request, response) => {
  response.status(200).send('good to go.');
})

app.get('/add', (request, response) => {
  // get our data from the front end
  // console.log(request.query);
  const firstName = request.query.first_name;
  const lastName = request.query.last_name;
  const safeQuery = [firstName, lastName];

  // create our SQL query
  const SQL = 'INSERT INTO users (first_name, last_name) VALUES ($1, $2);'

  // give our SQL query to our pg "agent"

  client.query(SQL, safeQuery)
    .then( results => {
      response.status(200).json(results);
    })
    .catch( error => {response.status(500).send(error)});
})


app.get('/retrieve', (request, response) => {
  // create our query
  const SQL = `SELECT * from users`;

  // give our SQL query to our pg "agent"
  client.query(SQL)
    .then( results => {
      response.status(200).json(results);
    })
    .catch( error => {response.status(500).send(error)});
})

// Start our server
client.connect()
  .then( () => {
    app.listen(PORT, () => {
      console.log(`Server is up on port ${PORT}.`);
    });
  })
  .catch(err => {
    throw `PG startup error: ${err.message}`;
  })