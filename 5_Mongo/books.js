// requiring mongoose
const mongoose = require("mongoose");
// connecting mongoose to our DataBase
// mongoose.connect('mongodb://127.0.0.1:27017/test');
main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const bookschema = mongoose.Schema({
  title: {
    type: String,
    required: true, // it is compulsory
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const Book = mongoose.model("Book", bookschema); // collection ~ table

let book1 = new Book({
  title: "",
//   author: "RD sharma",
  price: 1200,        // or "1200"
});

book1
  .save()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
