const port = 3000;
const mysql = require("mysql2");

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

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use('/', express.static('public'));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/registration', urlencodedParser, function (req, res) {
  con.query('INSERT INTO users (firsName, lastName, password, phone, email) VALUES ("'+req.body.fname+'", "'+req.body.lname+'", "'+req.body.password+'","'+req.body.phone+'","'+req.body.email+'")', (err, result) => {
    if (err) throw err;
  });
  res.sendfile(__dirname + '/public/regAnswer.html');
});

let enterRightVal = [];
app.post('/actions', urlencodedParser, function (req, res) {
  if(req.body.email == 'admin@1.com' && req.body.password == 3355) {
    res.sendfile(__dirname + '/public/admin.html');
  }
  else {
    con.query('SELECT * FROM users', (err, result) => {
      if (err) throw err;
       enterRightVal = result.filter(item => {
        if(item.email == req.body.email && item.password == req.body.password) {
          return item.idusers;
        }
      }); 
      if(enterRightVal.length) {
         res.sendfile(__dirname + '/public/products.html');
      }
      else {
        res.sendfile(__dirname + '/public/wrongEnter.html');
      }
    });
  }
});

app.get('/actions', urlencodedParser, function (req, res) {
  res.send(enterRightVal);
});

app.get('/products', urlencodedParser, function (req, res) {
      con.query("SELECT * FROM products", (err, result) => {
        if (err) throw err;
        res.header('Access-Control-Allow-Origin', '*');
        res.send(result);
      });
});

app.get('/basket', urlencodedParser, (req, res) => {
  res.sendfile(__dirname + '/public/basket.html')
});

app.post('/orders', urlencodedParser, function (req, res) {
  con.query('INSERT INTO orders (adressDelivery, totalPrice, users_idusers)  VALUES ("'+req.body.inputDelivery+'", "'+req.body.totalPrice+'", "'+enterRightVal[0].idusers+'" )');

  let jsonParse = JSON.parse(req.body.productChoiced);
  jsonParse.map(product => {
    console.log(product);
    con.query('INSERT INTO orderedProducts (img, price, name, amount, users_idusers) VALUES ("'+product.img+'", "'+product.price+'", "'+product.name+'", "'+product.amount+'", "'+enterRightVal[0].idusers+'")');
     res.sendfile(__dirname + '/public/products.html');
});

});

app.get('/dataOrders', urlencodedParser, (req, res) => {
  con.query("SELECT users.firsName, users.lastName, users.phone, users.email, orders.adressDelivery, orders.totalPrice FROM users INNER JOIN orders ON users_idusers = idusers; ", (err, result) => {  
    res.send(result);
  });
});

app.get('/dataMore', urlencodedParser, (req, res) => {
  con.query("SELECT name, price, amount FROM orderedProducts ", (err, result) => {  
    res.send(result);
  });
});

app.listen(port, (err) => {
  if (err) { 
      return console.log('Error!', err) //productChoiced = "'+req.body.productChoiced+'",
  }
  console.log(`server is listening on ${port}`)
});
