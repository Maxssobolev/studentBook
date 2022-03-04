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



/////////////////////ROUTES//////////////

//новости
app.get('/api/news', function (req, res) {
  pool.query(`select * from news`, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});





//домашка
app.get('/api/homework', function (req, res) {

  //обьединяем выборку из домашки с выборкой из предметов
  pool.query(`
    SELECT homeworks.id as id, 
           homeworks.content as content, 
           homeworks.deadline as deadline, 
           homeworks.title as title, 
           homeworks.publishDate as publishDate, 
           subjects.id as subjectId,
           subjects.title as subjectTitle
           FROM homeworks INNER JOIN subjects ON 
                          subjects.id = homeworks.subjectId`, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });

});
app.get('/api/homework/:id', function (req, res) {
  const id = req.params.id
  pool.query(`
    SELECT homeworks.id as id, 
           homeworks.content as content, 
           homeworks.deadline as deadline, 
           homeworks.title as title, 
           homeworks.publishDate as publishDate, 
           subjects.id as subjectId,
           subjects.title as subjectTitle
           FROM homeworks INNER JOIN subjects ON 
                          subjects.id = homeworks.subjectId
           WHERE homeworks.id=${id}`,
    (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.send(...rows);
      }
    });

});


//предметы
app.get('/api/subjects', function (req, res) {

  pool.query(`SELECT * FROM subjects`, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });

});

app.get('/api/subjects/:id', function (req, res) {
  const id = req.params.id
  pool.query(`SELECT * FROM subjects WHERE id=${id}`, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(...rows);
    }
  });

});

