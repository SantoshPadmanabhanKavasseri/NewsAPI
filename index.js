const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const {default: axios} = require("axios");

const app = express();
app.use(bodyParser.json());


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


