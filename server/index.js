const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3555;
const path = require('path');
const moment = require('moment');
const fs = require('fs');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'sb',
  password: 'root',
});

app.use(express.json());

app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});


app.get('/api/news', function (req, res) {
  pool.query(`select * from news`, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});