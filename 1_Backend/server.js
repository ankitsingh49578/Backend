// step1: create a folder
// step2: move into that folder
// step3: npm init -y
// step4: open folder using VSCode
// step5: npm i express
// step6: create server.js

const express = require('express');   //This imports the Express.js module.
const app = express();         //This creates an instance of an Express application.


//This line starts the Express server and makes it listen for incoming requests on port 3000
app.listen(3000, () => {
    console.log("Server Started at port no. 3000")
});

// //This code defines a GET route in an Express.js application
// app.get('/', (request, response) => {
//     response.send("Hi, How are you?");
// })
app.get('/about', (request, response) => {
    response.send("Hi, I am a Competitive Programmer!")
})

// // path parameters
// app.get('/:username/:id', (req, res) => {
//     console.log(req.params);
//     const {username, id} = req.params;
//     res.send(`Hey their my username is @${username} and my id is ${id}`)
// })

// query strings
app.get('/search', (req, res) => {
    console.log(req.query);
    res.send('No Response');
})

// // Default path if the above path doesn't matches
// app.get('*', (req, res) => {
//     res.send('This Path does not exist !');
// })

app.set("view engine", "ejs");      // => view == template

app.get('/', (req, res) =>{
    // express will by default find the views folder then will search for "home.ejs" file
    res.render("home.ejs");  
})

app.get("/rolldice", (req, res) =>{
    let diceVal = Math.floor(Math.random()*6)+1;
    res.render("rolldice.ejs", {diceVal});
})

// use of loops in ejs templates 
app.get("/instagram/:username", (req, res) => {
    let followers = ["ankit", "aman", "anil", "anubhav"];
    let {username} = req.params;
    res.render("instagram.ejs", {username, followers});
})


// // When a client sends a POST request with JSON data, Express by default does not parse the body.
// // Adding app.use(express.json()); tells Express to automatically convert the incoming JSON data into a JavaScript object, making it accessible via req.body.
// app.use(express.json());

// // Post request can be send using POSTMAN (GUI tool)
// app.post('/api/cars', (request, response) => {
//     const {name, brand} = request.body;
//     console.log(name);
//     console.log(brand);
//     response.send("Car Submitted Successfully.");
// })

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/myDatabase'/*, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }*/)
// .then(() => {console.log("Connection Successful")})
// .catch((error) => {console.log("Recieved an Error")});