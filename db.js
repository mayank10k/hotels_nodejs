const mongoose=require('mongoose');
// import mongoose from "mongoose";

require('dotenv').config();
//define mongodb connection url
// const mongoURL='mongodb://localhost:27017/hotels'
// const mongoURL=process.env.MONGODB_URL_LOCAL;   //define the above line int the .env file with the same name int this line
const mongoURL=process.env.MONGODB_URL;  //online database-->mongodb atlas

//set up mongodb connection
mongoose.connect(mongoURL);

//get the default connection
//mongoose maintains default connection object representing the mongodv connection
const db=mongoose.connection;

//event listeners

db.on('connected',()=>{
    console.log("connected to mongodb server");
})

db.on('error',(err)=>{
    console.log("mongodb error:",err);
})

db.on('disconnected',()=>{
    console.log("mongodb disconnected");
})

//export database connectionn
module.exports=db;      // common js syntax     //db represent the mongodb connection

// export default db;         // es modules
