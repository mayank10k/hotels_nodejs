const express=require('express');
const router=express.Router();
const MenuItem=require('./../models/MenuItem.js')

router.post('/',async(req,res)=>{
  try{
    const newItem=new MenuItem(req.body);
    const response=await newItem.save();
    console.log("data saved");
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'})
  }
})

router.get('/',async (req,res)=>{
  try{
    const data=await MenuItem.find();
    console.log("Menu fetched successfully");
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'})
  }
})

router.get('/:taste',async(req,res)=>{
  try{
    const taste=req.params.taste;    //extract the work type form the URL parameter
    if(taste=='spicy' || taste=='sour' || taste=='sweet'){
      const response=await MenuItem.find({taste:taste});
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

module.exports=router;