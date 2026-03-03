const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;  //username and password strategy
const Person=require('./models/Person.js')

passport.use(new LocalStrategy(async(username,password,done)=>{    //done is callback function
  //authentication logic here
  try{
    // console.log('Received Credentials:',username,password);
    const user=await Person.findOne({username:username});
    if(!user){
      return done(null,false,{message:'Incorrect username.'});
    }
    const isPasswordMatch=await user.comparePassword(password)
    if(isPasswordMatch){
      return done(null,user)
    }else{
      return done(null,false,{message:'Incorrect password'})
    }
  }catch(err){
    return done(err);
  }
}))

module.exports=passport;