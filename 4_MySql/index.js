//Faker tries to generate realistic data and not obvious fake data. The generated names, addresses, emails, phone numbers, and/or other data might be coincidentally valid information. Please do not send any of your messages/calls to them from your test setup.
const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");    // Get the client
const express = require("express");
const app = express();
const path = require('path');
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
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

// Edit Route
app.get('/user/:id/edit', (req, res) => {
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {    // 100 fake users data
      if (err) throw err;
      // console.log(result);
      let user = result[0];
      // console.log(result[0]);
      res.render("edit.ejs", {user});
      
    });
  } catch (err) {
    console.log(err);
    res.send("some error in database");
  }
});

// Update Route
app.patch('/user/:id', (req, res) => {
  let {id} = req.params;
  let {password: formPass, username: newUsername} = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {    // 100 fake users data
      if (err) throw err;
      let user = result[0];
      if(formPass != user.password){
        res.send('WRONG password');
      }
      else {
        let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`
        connection.query(q2, (err, result)=>{
          if(err)throw err;
          res.redirect('/user');
        })
      }
    });
  } catch (err) {
    console.log(err);
    res.send("some error in database");
  }
});

// Delete(auth) credential Route
app.get('/user/:id/delete', (req, res)=>{
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`; 
  try{
    connection.query(q, (err, result)=>{
      if(err)throw err;
      let user = result[0];
      res.render('delete.ejs', {user})
    });
  }catch(err){
    console.log(err);
    res.send("Some error in DB");
  }
});

// DELETE Route
app.delete('/user/:id', (req, res) =>{
  let {id} = req.params;
  let {email: formEmail, password: formPassword} = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q, (err, result)=>{
      if(err)throw err;
      let user = result[0];
      if(formEmail != user.email || formPassword != user.password){
        res.send("You have Entered WRONG Credentials!");
      }
      else{
        let q2 = `DELETE FROM user WHERE id='${id}'`
        try{
          connection.query(q2, (err, result)=>{
            if(err)throw err;
            res.redirect('/user');
          })
        }catch(err){
          console.log(err);
          res.send("There is an error in DB");
        }
      }
    })
  }catch(err){
    console.log(err);
    res.send("There is an error in DB")
  }
});

// Add new user
app.get('/user/new', (req, res)=>{
  res.render('new.ejs');
})

// Adding new user
app.post('/user', (req, res)=>{
  let {id: formId, email: formEmail, username: formUsername, password: formPassword} = req.body;
  let q = `INSERT INTO user (id, email, userName, password) VALUES ('${formId}', '${formEmail}', '${formUsername}', '${formPassword}')`;
  try{
    connection.query(q, (err, result)=>{
      if(err)throw err;
      res.redirect('/');
    })
  }catch(err){
    console.log(err);
    res.send("There is an error in the DB");
  }
})

app.listen("3000",() => {
  console.log("Server is listening to port 3000")
}); 
