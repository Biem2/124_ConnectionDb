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

app.post('/api/mahasiswa', (req, res) => {
  const { nama, alamat , agama } = req.body;


  if (!nama || !alamat || !agama) {
    return res.status(400).json({ error: 'Semua field harus diisi!' });
  }

  const sql = 'INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)';
  db.query(sql, [nama, alamat, agama], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Gagal menambah data' });
    }
    res.status(201).json({ message: 'Data berhasil ditambahkan', id: result.insertId });
  });
});

