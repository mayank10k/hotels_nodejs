const mongoose=require('mongoose');
// import mongoose from "mongoose";

//define mongodb connection url
const mongoURL='mongodb://localhost:27017/hotels'

//set up mongodb connection
mongoose.connect(mongoURL);
// old version
// mongoose.connect(mongoURL,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })

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
