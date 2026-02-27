const mongoose=require('mongoose');

//define the person schema

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,    //means chahiye hi chahiye -->means it will reqire name to save this document

    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],   //define kr diya --->work m in teeno m se hi hoga otherwise accept nhi krega
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true       //agar do document m same email hoga vo accept hi nhi krega
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    }
});


//create person model
const Person=mongoose.model('Person',personSchema);
module.exports=Person;