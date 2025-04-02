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
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// Model in mongoose is a class with which we construct documents (Collection ~ Table)
const User = mongoose.model("User", userSchema);
// const Employee = mongoose.model("Employee", userSchema);

// const user1 = new User({
//   name: "Ankit",
//   email: "abloom.tech",
//   age: 21,
// });
// const user2 = new User({
//   name: "Atul",
//   email: "atul.tech",
//   age: 21,
// });

// // to save the data in the DB
// user1.save(); // this returns a promise

// user2
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// User.insertMany([
//   {name: "Tony", email: "tony@gmail.com", age: 50},
//   {name: "Peter", email: "peter@gmail.com", age: 30},
//   {name: "Bruce", email: "bruce@gmail.com", age: 47}
// ]).then(res => {console.log(res)});

// User.insertOne({
//   name: "Scarlett",
//   email: "scarlett@gmail.com",
//   age: 33,
// }).then((res) => {
//   console.log(res);
// });

// searching users in a collection(~table)
// User.find({}).then((res)=>{
//   console.log(res);
// }).catch((err)=>{
//   console.log(err);
// });

// User.find({age: {$gt: 46}}).then((res)=>{
//   console.log(res[0].name);
// }).catch((err)=>{
//   console.log(err);
// });

// // will find first individual which met the condition
// User.findOne({age: {$gt: 46}}).then((res)=>{
//   console.log(res);
// }).catch((err)=>{
//   console.log(err);
// });

// // will search or find the individual on the basis of the given id
// User.findOne({_id: "67ecde3b1be9b6d1c20345b6"}).then((res)=>{
//   console.log(res);
// }).catch((err)=>{
//   console.log(err);
// });

// // will search or find the individual on the basis of the given id
// User.findById("67ece302673ce00eedc4e599").then((res)=>{
//   console.log(res);
// }).catch((err)=>{
//   console.log(err);
// });

// // updating one of the document {{condition}, {data which we want to be update}}
// User.updateOne({ name: "Ankit" }, {name: "Aashish", email: "aashish.tech", age: 21 } )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // updating many of the document {{key}, {data which we want to be update}}
// User.updateMany({ age: { $gt: 46 } }, { age: 69 })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // finding and updating one of the document {{key}, {data which we want to be update}}
// User.findOneAndUpdate({ name: "Bruce" }, { age: 64 }) // we can add third param. in this {new: true} then it will console new age by default {new: false} is used
//   .then((res) => {
//     console.log(res); // will print before update age (46) but in DB age will be updated (64)
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // deleting one user
// User.deleteOne({ name: "Aashish" })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// deleting many user
User.deleteMany({ age: { $gt: 46 } })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// simillarly for knowing which data is deleted in console we can use this function ( .findByIdAndDelete) function 
