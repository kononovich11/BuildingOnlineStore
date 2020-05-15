const port = 3000;
const mysql = require("mysql2");

// const express = require('express');
// const app = express();  

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

// app.get('/', async (req, res) => {
//       con.query("SELECT * FROM users", (err, result) => {
//         if (err) throw err;
//         res.header('Access-Control-Allow-Origin', '*');
//         res.send(result);
//       });
// })



// app.listen(port, (err) => {
//   if (err) {
//       return console.log('something bad happened', err)
//   }
//   console.log(`server is listening on ${port}`)
// });

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// const fs = require('fs');


const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/', urlencodedParser, function (req, res) {
  console.log(req.url); 
  con.query('INSERT INTO users (firsName, lastName, password, phone, email) VALUES ("'+req.body.fname+'", "'+req.body.lname+'", "'+req.body.password+'","'+req.body.phone+'","'+req.body.email+'")', (err, result) => {
    if (err) throw err;
    // console.log(result);
  });
  res.sendfile(__dirname + '/public/regAnswer.html');
});

app.listen(port, (err) => {
  if (err) { 
      return console.log('Error!', err)
  }
  console.log(`server is listening on ${port}`)
});
