var jwt = require("jsonwebtoken")

var data = { username: "nodemy" }
var token = jwt.sign(data, 'nodemy');

console.log(token)

var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vZGVteSIsImlhdCI6MTY3NzkxOTQ0OH0.t9pHXEuwr1xoRgknRULv5Jg09yu6SRANAF91qNh4cb8"

var ketqua = jwt.verify(token,"nodemy")
console.log(ketqua)