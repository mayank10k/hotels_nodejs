//use nodemon for automatic running the program after changes
//npm install -g nodemon   --> then run -->   nodemon server.js  --> in the terminal
console.log('server file is running');

//function


// type 1
function add(a,b){
    return a+b;
}


// type 2
var add=function (a,b){
    return a+b;
}


// type 3  (arrrow function)
var add=(a,b)=>{
    return a+b;
}

//type 4
var add=(a,b)=>a+b;

let a=add(4,8);
console.log(a);

// one more type
(function (){
    console.log("mayank");
})();