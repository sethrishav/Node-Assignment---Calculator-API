const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

app.get("/",(req,res)=>{
    res.status(200).send("Hello world!");
})

//defined the variable
const million = 1000000;
 
//function for checking underflow
function isUnderflow(num1, num2, resultant){
    if(num1 < -million || num2 < -million || resultant < -million)
        return true;
    return false;
}

//function for checking overflow
function isOverflow(num1, num2, resultant){
    if(num1 > million || num2 > million || resultant > million)
        return true;
    return false;
}
 //function for checking string
function isString(num1, num2){
    if(typeof num1 === "string" || typeof num2 === "string")
        return true
    return false
}

app.post("/add" , (req, res)=>{
    let {num1 , num2} = req.body
    let sum = num1 + num2;
    let d = {
        status : null,
        message: null,
        sum: null
    }
    if (isOverflow(num1 , num2, sum)){
        d.status = "error";
        d.message = "Overflow";
        d.sum ="";
    }
    else if(isUnderflow(num1, num2, sum)){
        d.status = "error";
        d.message = "Underflow";
        d.sum="";
    }
    else if(isString(num1, num2)){
        d.status = "error";
        d.message="Invalid data types";
        d.sum = "";
    }
    else{
        d.status = "success";
        d.message = "the sum of given two numbers";
        d.sum = sum;
    }
    res.send(d)
})
app.post("/sub" , (req, res)=>{
    let {num1,num2} = req.body;
    let difference = num1 - num2;
    let d ={
        status: null,
        message: null,
        difference: null
    }
    if(isUnderflow(num1, num2, difference)){
        d.status = "error";
        d.message = "Underflow";
        d.difference = "";
    }
    else if(isOverflow(num1, num2, difference)){
        d.status = "error";
        d.message = "Overflow";
        d.difference="";
    }
    else if(isString(num1, num2)){
        d.status = "error";
        d.message="Invalid data types"
        d.difference="";
    }
    else{
        d.status = "success";
        d.message ="the difference of given two numbers";
        d.difference = difference;
    }
    res.send(d)
})
app.post("/multiply" , (req, res)=>{
    let {num1, num2} = req.body;
    let result = num1 * num2;
    let d ={
        status: null,
        message: null,
        result: null
    }
    if(isUnderflow(num1, num2, result)){
        d.status = "error";
        d.message = "Underflow";
        d.result = "";
    }
    else if(isOverflow(num1, num2, result)){
        d.status = "error";
        d.message = "Overflow";
        d.result="";
    }
    else if(isString(num1, num2)){
        d.status = "error";
        d.message="Invalid data types"
        d.result="";
    }
    else{
        d.status = "success";
        d.message ="The product of given numbers";
        d.result = result;
    }
    res.send(d)
})
app.post("/divide" , (req, res)=>{
    let {num1, num2} = req.body;
    let result = num1 / num2;
    let d ={
        status: null,
        message: null,
        result: null
    }
    if(num2 ===0){
        d.status = "error";
        d.message = "Cannot divide by zero";
        d.result = "";
    }
    else if(isUnderflow(num1, num2, result)){
        d.status = "error";
        d.message = "Underflow";
        d.result = "";
    }
    else if(isOverflow(num1, num2, result)){
        d.status = "error";
        d.message = "Overflow";
        d.result="";
    }
    else if(isString(num1, num2)){
        d.status = "error";
        d.message="Invalid data types"
        d.result="";
    }
    else{
        d.status = "success";
        d.message ="The division of given numbers";
        d.result = result;
    }
    res.send(d)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
