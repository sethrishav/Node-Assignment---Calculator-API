onst express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
const oneM = 1000000;
app.get('/', (req, resp) => {
  resp.send("Hello world!")
});

function checkUnderflow(num1, num2,val) {
  if (num1 < -oneM || num2 < -oneM || val < -oneM) {
    return true;
  }
  return false;
}
function checkOverflow(num1, num2,val) {
  if (num1 > oneM || num2 > oneM || val > oneM) {
    return true;
  }
  return false;
}
function checkString(num1, num2) {
  if (typeof num1 === "string" || typeof num2 === "string") {
    return true;
  }
  return false;
}
app.post('/add', (req, resp) => {
  let { num1, num2 } = req.body;
  let sum = num1 + num2;
  let data= {
    status: null,
    message: null,
    sum:null
  }
  if (checkUnderflow(num1, num2, sum)) {
    data.status = "error";
    data.message = "Underflow";
    data.sum="";
  }
  else if (checkOverflow(num1, num2, sum)) {
    data.status = "error";
    data.message = "Overflow";
    data.sum="";
  }
  else if (checkString(num1, num2)) {
    data.status = "error";
    data.message = "Invalid data types"
    data.sum="";
  } else {
    data.status = "success";
    data.message = "the sum of given two numbers";
    data.sum = sum;
  }
  resp.send(data)
})
app.post('/sub', (req, resp) => {
  let { num1, num2 } = req.body;
  let sub = num1 - num2;
  let data= {
    status: null,
    message: null,
    difference:null
  }
  if (checkUnderflow(num1, num2, sub)) {
    data.status = "error";
    data.message = "Underflow";
    data.difference = "";
  }
  else if (checkOverflow(num1, num2, sub)) {
    data.status = "error";
    data.message = "Overflow";
    data.difference = "";
  }
  else if (checkString(num1, num2)) {
    data.status = "error";
    data.message = "Invalid data types";
    data.difference = "";
  } else {
    data.status = "success";
    data.message = "the difference of given two numbers";
    data.difference = sub;
  }
  resp.send(data)
});
app.post('/multiply', (req, resp) => {
  let { num1, num2 }=req.body;
  let mul = num1 * num2;
  let data= {
    status: null,
    message: null,
    result:null
  }
  if (checkUnderflow(num1, num2, mul)) {
    data.status = "error";
    data.message = "Underflow";
    data.result = "";
  }
  else if (checkOverflow(num1, num2, mul)) {
    data.status = "error";
    data.message = "Overflow";
    data.result = "";
  }
  else if (checkString(num1, num2)) {
    data.status = "error";
    data.message = "Invalid data types";
    data.result = "";
  } else {
    data.status = "success";
    data.message = "The product of given numbers";
    data.result = mul;
  }
  resp.send(data)
});
app.post('/divide', (req, resp) => {
  let { num1, num2 } = req.body;
  let div = num1 / num2;
  let data= {
    status: null,
    message: null,
    result:null
  }
  if (num2 === 0) {
    data.status = "error";
    data.message = "Cannot divide by zero";
    data.result = "";
  }
  else if (checkUnderflow(num1, num2, div)) {
    data.status = "error";
    data.message = "Underflow";
    data.result = "";
  }
  else if (checkOverflow(num1, num2, div)) {
    data.status = "error";
    data.message = "Overflow";
    data.result = "";
  }
  else if (checkString(num1, num2)) {
    data.status = "error";
    data.message = "Invalid data types"
    data.result = "";
  } else {
    data.status = "error";
    data.message = "The division of given numbers";
    data.result = div;
  }
  resp.send(data);
});
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
