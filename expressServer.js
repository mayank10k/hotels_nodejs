// import express from 'express'
const express=require('express')    //common js
const db=require('./db')     //connect it
const app = express()
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT=process.env.PORT || 3000;
const passport=require('./auth');


//Middleware functions
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next();  //move on to the next phase
}

app.use(logRequest);   //apply logging to all end points or routes

app.use(passport.initialize());

const localAuthMiddleware=passport.authenticate('local',{session:false});

app.get('/', (req, res) => {
  res.send('Welcome to our Hotel ... How are you?')
})

// app.post('/person',async(req,res)=>{
//   try{
//     const data=req.body   //assuming the request body contains the person data

//   // const newPerson=new Person();
//   // newPerson.name=data.name
//   // newPerson.age=data.age
//   // newPerson.mobile=data.mobile
//   // newPerson.email=data.email;

//   //create a new person document using the mongoose model
//   const newPerson=new Person(data);

//   //save newperson to database
//   const response=await newPerson.save();  //will until it gets saved-->if a error comes it will directly go to the catch block
//   console.log("data saved");
//   res.status(200).json(response);


//   }catch(err){
//     console.log(err);
//     res.status(500).json({errror:'internal server error'})

//   }

// })

// //GEt method to get the person
// app.get('/person',async(req,res)=>{
//   try{
//     const data=await Person.find();
//     console.log("data fetched");
//     res.status(200).json(data);
//   }catch(error){
//     console.log(error);
//     res.status(500).json({error:'internal server error'})

//   }
// })

// /*
// app.get('/chicken', (req, res) => {
//   res.send('Welcome to JEENA CHICKEN SHOP,thanks for visiting')
// })

// app.get('/idli', (req, res) => {
//   var customized_idli={
//     name:'rava idli',
//     size:'10cm',
//     is_sambhar:true

//   }
//   res.send(customized_idli);
//   // res.send('Welcome to south india, Would love to serve you idli')
// })

// app.post('/items', (req, res) => {
//   res.send("data is send");

// })
// */

// app.post('/menu',async(req,res)=>{
//   try{
//     const newItem=new MenuItem(req.body);
//     const response=await newItem.save();
//     console.log("data saved");
//     res.status(200).json(response);
//   }catch(err){
//     console.log(err);
//     res.status(500).json({error:'internal server error'})
//   }
// })

// app.get('/menu',async (req,res)=>{
//   try{
//     const data=await MenuItem.find();
//     console.log("Menu fetched successfully");
//     res.status(200).json(data);
//   }catch(err){
//     console.log(err);
//     res.status(500).json({error:'Internal server error'})
//   }
// })

// app.get('/person/:workType',async(req,res)=>{  //parameterised api
//   try{
//     const workType=req.params.workType;    //extract the work type form the URL parameter
//     if(workType=='chef' || workType=='manager' || workType=='waiter'){
//       const response=await Person.find({work:workType});
//       console.log("resonse fetched");
//       res.status(200).json(response);

//     }else{
//       res.status(404).json({error:'Invalid workk type'});
//     }
    
//   }catch(err){
//     console.log(err);
//     res.status(500).json({error:'Internal server error'})

//   }
// })

//import the router files
const personRoutes=require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuItemRoutes');
// use the routers
app.use('/person',localAuthMiddleware,personRoutes);  //if want to use middleware function here we'll write it inside it
app.use('/menu',menuItemRoutes);   //for authenticating any write pass it inside this fucnttion

//comment added-->either at given port or 3000
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000')
})