'use strict';

// <script src="http://jquery...."
// Bring in the express library
const express = require('express');

// Create an "application" from express
const app = express();

// Tell the application to use the ./public folder for ... http://localhost/xyz
app.use( express.static('./public') );

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is really really running on port ${PORT}`) );
