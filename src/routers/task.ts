import { Router, Request, Response, NextFunction } from 'express';
import { AccountModel } from '../models/account';

import cookieParser from 'cookie-parser';
import path from 'path';
import jwt from 'jsonwebtoken';

const TaskRouter = Router();

TaskRouter.use(cookieParser())

TaskRouter.get('/', checkLogin, checkStudent, (req: Request, res: Response, next: NextFunction) => {
    res.json(req.body.data)
})
TaskRouter.get('/student/', checkLogin, checkTeacher, (req: Request, res: Response, next: NextFunction) => {

})
TaskRouter.get('/teacher/', checkLogin, checkManager, (req: Request, res: Response, next: NextFunction) => {

})
TaskRouter.get('/manager/', checkLogin, (req: Request, res: Response, next: NextFunction) => {

})

function checkManager(req: Request, res: Response, next: NextFunction): void {
    var role: Number = req.body.data.role
    if (role >= 2) {
        next()
    } else {
        res.json('Not Permission')
    }
}

function checkTeacher(req: Request, res: Response, next: NextFunction): void {
    var role: Number = req.body.data.role
    if (role >= 1) {
        next()
    } else {
        res.json('Not Permission')
    }
}

function checkStudent(req: Request, res: Response, next: NextFunction): void {
    var role: Number = req.body.data.role
    if (role >= 0) {
        next()
    } else {
        res.json('Not Permission')
    }
}

function checkLogin(req: Request, res: Response, next: NextFunction): void {
    jwt.verify(req.cookies.token, 'mk',
        function (err: any, decoded: any) {
            if (err) return res.status(500).json(`loi server: ${err}`)
            AccountModel
                .findOne({ _id: decoded })
                .then(data => {
                    if (data) {
                        req.body.data = data
                        next()
                    } else {
                        res.json('NOT PERMISSION')
                    }
                })
                .catch(err => { })
        })
}

export { TaskRouter }