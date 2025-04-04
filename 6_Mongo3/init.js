const mongoose = require("mongoose");
const Chat = require("./models/chat.js"); // importing (requiring model)

main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let allChats = [
  {
    from: "Iron Man",
    to: "Thor",
    message: "Where is Captain ?",
    created_at: new Date(),
  },
  {
    from: "Thor",
    to: "Iron",
    message: "I don't know. Did u asked to Hulk",
    created_at: new Date(),
  },
  {
    from: "Iron Man",
    to: "Thor",
    message: "No, I didn't. Let me ask him",
    created_at: new Date(),
  },
  {
    from: "Iron Man",
    to: "Hulk",
    message: "Hey Bruce! Do u know where is Captain ?",
    created_at: new Date(),
  },
  {
    from: "Hulk",
    to: "Iron Man",
    message: "No, Tony I don't know where is captain. But why what happend?",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
