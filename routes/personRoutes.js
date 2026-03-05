const express=require('express');
const router=express.Router();
const Person=require('./../models/Person.js')
const {jwtAuthMiddleware,generateToken}=require('./../jwt')

router.post('/signup',async(req,res)=>{
  try{
    const data=req.body   
    const newPerson=new Person(data);

    //save newperson to database
    const response=await newPerson.save();  //will until it gets saved-->if a error comes it will directly go to the catch block
    console.log("data saved");

    const payload={
      id:response.id,
      username:response.username
    }
    console.log(JSON.stringify(payload));
    const token=generateToken(payload);
    console.log("token is : ",token);
    res.status(200).json({response:response,token:token});


  }catch(err){
    console.log(err);
    res.status(500).json({errror:'internal server error'})

  }

})

//GEt method to get the person
router.get('/',async(req,res)=>{
  try{
    const data=await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  }catch(error){
    console.log(error);
    res.status(500).json({error:'internal server error'})

  }
})

//parameterised api
router.get('/:workType',async(req,res)=>{
  try{
    const workType=req.params.workType;    //extract the work type form the URL parameter
    if(workType=='chef' || workType=='manager' || workType=='waiter'){
      const response=await Person.find({work:workType});
      console.log("resonse fetched");
      res.status(200).json(response);

    }else{
      res.status(404).json({error:'Invalid workk type'});
    }
    
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'})

  }
})

router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;   //sxtract tthe id from the url parameter
        const updatedPersonData=req.body;   //updated data for  the person

        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,   //return the updated document
            runValidators:true,   // run Mongoose validation
        })

        if(!response){  //agar person present hi na ho 
            return res.status(404).json({error:'Person not found'});
        }

        console.log("data updated");
        res.status(400).json(response);


    }catch(err){
        console.log(err);
        res.status(200).json({error:'internal server error'})
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id; 
        const response=await Person.findByIdAndDelete(personId);

        if(!response){  //agar person present hi na ho 
            return res.status(404).json({error:'Person not found'});
        }

        console.log("data deleted");
        res.status(400).json({message:"person deleted successfully"});

    }catch(error){
        console.log(err);
        res.status(200).json({error:'internal server error'})
    }
})

module.exports=router;