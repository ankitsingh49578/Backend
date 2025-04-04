const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js"); // importing (requiring model)
const methodOverride = require('method-override');

// the below two lines are essential to connect .ejs files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// the below line is essential to connect public folder files with .ejs files
app.use(express.static(path.join(__dirname, "public")));
// the below line is use for parsing the data
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// index route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find(); // from the Chat collection(~table) it will give all the data(chats)
  // console.log(chats);
  res.render("index.ejs", { chats });
});

// New Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create Route
app.post("/chats", (req, res) => {
  let { from, msg, to } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    message: msg,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((res) => {
      console.log("Chat was Saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

// Edit Route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// Update Route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { message: newMsg },
    { runValidators: true, new: true }
  );
  console.log(updatedChat);
  res.redirect('/chats');
});

// Delete Route
app.delete('/chats/:id', async (req, res)=>{
  let {id} = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect('/chats');
})

app.get("/", (req, res) => {
  res.send("root is working");
});

app.listen(3000, () => {
  console.log("Server is listening at 3000");
});
