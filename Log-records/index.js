let fs = require("fs");

let obj = require("readline-sync");
let id = obj.question("Enter the id :");
let name = obj.question("Enter the name :");
let salary = obj.question("Enter the salary :");
console.log("Your id is :"+id);
console.log("Your Name is :"+name);
console.log("Your Salary is :"+salary);

debugger;

let emp1 = {"id":100, "name":"Ravi","salary":12000};
let emp2 = {"id":101, "name":"Ramesh","salary":14000};
let emp3 = {"id":102, "name":"Rajesh","salary":16000};
let emp = new Array();
emp.push(emp1);
emp.push(emp2);
emp.push(emp3);
debugger;

//convert string to object 
var empJson = JSON.parse(empObj);
console.log("Id is "+empJson.id);
console.log("Name is "+empJson.name);
console.log("Salary is "+empJson.salary);
//convert json to string 
var empString = JSON.stringify(empJson);
fs.writeFile("emp.json",empString,{flag:"a"},(err)=> {
    if(!err){
        console.log("Record stored successfully...")
    }
})
debugger;

// convert array object to string(Read operation)
let jsonData = JSON.stringify(emp);
fs.writeFileSync("employee.json",jsonData);
console.log('Data added');
debugger;
// write operation
let data = fs.readFileSync("employee.json");
console.log(data.toString());
let jsonSting = data.toString();
let anotherJSON = JSON.parse(jsonSting);
console.log(anotherJSON[0].id);

