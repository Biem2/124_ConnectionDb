const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});


