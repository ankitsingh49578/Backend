const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Ankit",
        content: "I don't know what to write here"
    },
    {
        id: uuidv4(),
        username: "Aman",
        content: "Instead of hard work do Smart work"
    },
    {
        id: uuidv4(),
        username: "Ashish",
        content: "Love is Life"
    }
];

app.get('/posts', (req, res) =>{
    res.render("index.ejs", {posts});
});

app.get('/posts/new', (req, res)=>{
    res.render('new.ejs');
});

app.post('/posts', (req, res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({username, content, id});
    res.redirect('/posts');
});

app.get('/posts/:id', (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});

app.patch('/posts/:id', (req, res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    // console.log(post);
    // console.log(id);
    // console.log(newContent);
    // res.send("path req working");
    res.redirect('/posts');
});

app.get('/posts/:id/edit', (req, res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render('edit.ejs', {post});
});

app.delete('/posts/:id', (req, res) =>{
    let {id} = req.params;

    posts = posts.filter((p) => id !== p.id);
    res.redirect('/posts');
    // res.send("Post deleted Successfully!");  
});

app.listen(PORT, () => {
    console.log("Listening at PORT : 3000");
});

