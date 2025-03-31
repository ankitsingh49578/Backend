const express = require("express");
const app = express();
const port = 3000;

// below two lines are middleware
app.use(express.urlencoded({extended: true}));  // used to parse another type data url encoded
app.use(express.json());            // used to parse json data

app.get('/register', (req, res) =>{
    let {username, password} = req.query;
    res.send(`Standard GET response. Welcome ${username}!`);
})

app.post('/register', (req, res) =>{
    console.log(req.body);
    res.send("Standard POST response")
})

app.listen(port, () => {
    console.log(`listening at port ${port}`);
})