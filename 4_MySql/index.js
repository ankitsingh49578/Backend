//Faker tries to generate realistic data and not obvious fake data. The generated names, addresses, emails, phone numbers, and/or other data might be coincidentally valid information. Please do not send any of your messages/calls to them from your test setup.
const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");    // Get the client
const express = require("express");
const app = express();
const path = require('path');

app.set('views engine', "ejs");
app.set('views', path.join(__dirname, '/views'));

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "firstDB",
  password: "ankit@123",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), 
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// home route
app.get('/', (req, res) => {    // res -> response
  let q = 'SELECT COUNT(*) FROM user';
  try {
  connection.query(q, (err, result) => {    // 100 fake users data
    if (err) throw err;
    console.log(result[0]['COUNT(*)']);
    let users = result[0]['COUNT(*)'];
    res.render('home.ejs', {users});
  });
} catch (err) {
  console.log(err);
  res.send("some error in database");
}
});

// show route
app.get('/user', (req, res)=>{
  // res.send("success");
  let q = 'SELECT * FROM user';
  try {
    connection.query(q, (err, users) => {    // 100 fake users data
      if (err) throw err;
      // console.log(result);
      res.render('showUser.ejs', {users});
    });
  } catch (err) {
    console.log(err);
    res.send("some error in database");
  }
});

app.listen("3000",() => {
  console.log("Server is listening to port 3000")
}); 
