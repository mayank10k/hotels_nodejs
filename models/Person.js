const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

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
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
});

personSchema.pre('save',async function(){
    const person=this;

    //Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return ;
    try{
        // hash password generation
        const salt=await bcrypt.genSalt(10);

        //hash password
        const hashedPassword=await bcrypt.hash(person.password,salt);

        //override the plain password with the hashed one
        person.password=hashedPassword
         
        // next();
    }catch(err){
        return err;
    }
})

personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with the hashed password
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;

    }catch(err){
        throw err;
    }
}


//create person model
const Person=mongoose.model('Person',personSchema);
module.exports=Person;