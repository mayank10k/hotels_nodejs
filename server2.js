const notes=require('./notes.js');
const _ =require('lodash');     //npm i lodash

console.log('server2 file');

var age=notes.age;
console.log(age);

var result=notes.addNumber(age,2);
console.log("result is :"+result);

var data=['mayank','maya','mehta',2,5,6,4,2,6,'2']
var filter=_.uniq(data);
console.log(filter);

console.log(_.isString(7));