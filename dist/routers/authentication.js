"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationRouter = void 0;
const express_1 = require("express");
const account_1 = require("../models/account");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthenticationRouter = (0, express_1.Router)();
exports.AuthenticationRouter = AuthenticationRouter;
const SECRET = 'secret';
AuthenticationRouter.use((0, cookie_parser_1.default)());
AuthenticationRouter.get('/', (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, 'login.html'));
});
//*Login
AuthenticationRouter.post('/', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    account_1.AccountModel
        .findOne({
        username: username,
        password: password,
    })
        .then(data => {
        if (data) {
            let token = jsonwebtoken_1.default.sign({ _id: data._id }, SECRET);
            return res.json({
                message: "sucess",
                token: token,
            });
        }
        else {
            return res.json("Failed");
        }
    })
        .catch(err => res.status(500).json(`loi server ${err}`));
});
AuthenticationRouter.get('/private/', (req, res, next) => {
    var token = req.cookies.token;
    jsonwebtoken_1.default.verify(token, SECRET, function (err, decoded) {
        if (err)
            return res.redirect('/Authentication');
        return next();
    });
}, (req, res, next) => { res.json('welcome'); });
//# sourceMappingURL=authentication.js.map