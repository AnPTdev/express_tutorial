"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var data = { username: "nodemy" };
// var token: string = jwt.sign(data, 'nodemỵ');
// console.log(token)
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vZGVteSIsImlhdCI6MTY3NzkwNzg5NX0.-eLDModHejzlV0r75PXH7qut-VhCh9SB4_u54WxqJdd";
var ektqua = jsonwebtoken_1.default.verify(token, 'nodemy');
console.log(ektqua);
//# sourceMappingURL=training.js.map