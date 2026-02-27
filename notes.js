console.log('notes page is loaded');

var age=18;

function addNumber(a,b){
    return a+b;
}

// if you want to export age you need to write this
// it should be at the lasst of the file
module.exports={
    age,
    addNumber
}