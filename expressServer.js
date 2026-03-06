// import express from 'express'
const express=require('express')    //common js
const db=require('./db')     //connect it
const app = express()

require('dotenv').config();
const bodyParser = require('body-parser');
// app.use(bodyParser.json());
app.use(express.json());   // modern way

const PORT=process.env.PORT || 3000;
const passport=require('./auth');

app.use(passport.initialize());

const localAuthMiddleware=passport.authenticate('local',{session:false});

app.get('/', (req, res) => {
  res.send('Welcome to our Hotel ... How are you?')
})

//import the router files
const personRoutes=require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuItemRoutes');
// use the routers
app.use('/person',personRoutes);  //if want to use middleware function here we'll write it inside it
app.use('/menu',menuItemRoutes);   //for authenticating any write pass it inside this fucnttion

//-->either at given port or 3000
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000')
})