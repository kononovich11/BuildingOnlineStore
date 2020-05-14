const port = 3000;
const mysql = require("mysql2");

const express = require('express');
const app = express();  

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "mydb",
    password: "mysql11"
}).promise();

con.connect()
  .then(() => {
      console.log('Connection has been established successfully.');
  })
  .catch(err => {
      console.error('Unable to connect to the database:', err);
  });

app.get('/', async (req, res) => {
      con.query("SELECT * FROM users", (err, result) => {
        if (err) throw err;
        res.header('Access-Control-Allow-Origin', '*');
        res.send(result);
      });
})

app.listen(port, (err) => {
  if (err) {
      return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
});
