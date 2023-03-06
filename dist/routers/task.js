"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRouter = void 0;
const express_1 = require("express");
const account_1 = require("../models/account");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TaskRouter = (0, express_1.Router)();
exports.TaskRouter = TaskRouter;
TaskRouter.use((0, cookie_parser_1.default)());
TaskRouter.get('/', checkLogin, checkStudent, (req, res, next) => {
    res.json(req.body.data);
});
TaskRouter.get('/student/', checkLogin, checkTeacher, (req, res, next) => {
});
TaskRouter.get('/teacher/', checkLogin, checkManager, (req, res, next) => {
});
TaskRouter.get('/manager/', checkLogin, (req, res, next) => {
});
function checkManager(req, res, next) {
    var role = req.body.data.role;
    if (role >= 2) {
        next();
    }
    else {
        res.json('Not Permission');
    }
}
function checkTeacher(req, res, next) {
    var role = req.body.data.role;
    if (role >= 1) {
        next();
    }
    else {
        res.json('Not Permission');
    }
}
function checkStudent(req, res, next) {
    var role = req.body.data.role;
    if (role >= 0) {
        next();
    }
    else {
        res.json('Not Permission');
    }
}
function checkLogin(req, res, next) {
    jsonwebtoken_1.default.verify(req.cookies.token, 'mk', function (err, decoded) {
        if (err)
            return res.status(500).json(`loi server: ${err}`);
        account_1.AccountModel
            .findOne({ _id: decoded })
            .then(data => {
            if (data) {
                req.body.data = data;
                next();
            }
            else {
                res.json('NOT PERMISSION');
            }
        })
            .catch(err => { });
    });
}
//# sourceMappingURL=task.js.map