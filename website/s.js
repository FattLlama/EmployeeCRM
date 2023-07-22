const express = require('express');
const mysql = require('mysql');

const app = express();

//This is connects to the server for now I am leaving placeholder names until the server is up
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'database'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
})