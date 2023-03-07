"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateRouter = void 0;
const express_1 = require("express");
const account_1 = require("../models/account");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthenticateRouter = (0, express_1.Router)();
exports.AuthenticateRouter = AuthenticateRouter;
AuthenticateRouter.use((0, cookie_parser_1.default)());
AuthenticateRouter.get('/', (req, res, next) => {
    res.sendFile('login.html', { root: 'pages' });
});
//*Login
AuthenticateRouter.post('/', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    account_1.AccountModel
        .findOne({
        username: username,
        password: password,
    })
        .then(data => {
        if (data) {
            let token = jsonwebtoken_1.default.sign({ _id: data._id }, 'mk');
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
AuthenticateRouter.get('/home', (req, res, next) => {
    let token = req.cookies.token;
    let decodedToken = jsonwebtoken_1.default.verify(token, 'mk');
    account_1.AccountModel.find({ _id: decodedToken['_id'] }).then(function (data) {
        if (data.length == 0) {
            return res.redirect('/login');
        }
        else {
            if (data[0].role == 0) {
                next();
            }
            else {
                return res.redirect('/login');
            }
        }
    });
}, (req, res, next) => {
    res.sendFile('home.html', { root: 'pages' });
});
AuthenticateRouter.post('/edit', (req, res, next) => {
    let token = req.headers.cookie.split("=")[1];
    console.log(token);
    let decodedToken = jsonwebtoken_1.default.verify(token, 'mk');
    account_1.AccountModel.find({ _id: decodedToken['_id'] }).then(function (data) {
        if (data.length == 0) {
            return res.redirect('/login');
        }
        else {
            if (data[0].role == 0) {
                next();
            }
            else {
                return res.json({ error: true, message: "ban khong co quyen sua" });
            }
        }
    });
    next();
}, (req, res, next) => {
    res.json('sucess!');
});
AuthenticateRouter.get('/private/', (req, res, next) => {
    var token = req.cookies.token;
    jsonwebtoken_1.default.verify(token, 'mk', function (err, decoded) {
        if (err)
            return res.redirect('/Authentication');
        return next();
    });
}, (req, res, next) => { res.json('welcome'); });
//# sourceMappingURL=authenticate.js.map