const mongoose=require('mongoose');

const menuItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true

    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true
    },
    is_drink:{
        type:Boolean,
        defauly:false   //agr koi data na bheje toh false ho jayega,age bheje toh true ho jayega

    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        dafault:0
    }
    
});

const MenuItems=mongoose.model('MenuItem',menuItemSchema);

module.exports=MenuItems;