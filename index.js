const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3309',
  password: 'MieAyam678',
  database: 'mahasiswa',
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL successfully');
});

app.get('/mahasiswa', (req, res) => {
  const sql = 'SELECT * FROM biodata';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});


