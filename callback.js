//call back function

/*
function callback(){
    console.log("now adding is successfully completed");
}

const add= function(a,b,callback){
    var result=a+b;
    console.log("result : "+result);
    callback();
}

add(3,56,callback);
*/

const add=function(a,b,fun){
    var result=a+b;
    console.log("Result: "+result);
    fun();   //this is the call back function
}

// add(4,6,function(){
//     console.log("addition is completed");
// })



add(6,8,()=>console.log("addition is done"))   //most prefered