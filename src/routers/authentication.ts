import { Router, Request, Response, NextFunction } from 'express';
import { AccountModel } from '../models/account';

import cookieParser from 'cookie-parser';
import path from 'path';
import jwt from 'jsonwebtoken';

const AuthenticationRouter = Router();

AuthenticationRouter.use(cookieParser())

AuthenticationRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, 'login.html'))
})


//*Login
AuthenticationRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    let username: string = req.body.username
    let password: string = req.body.password

    AccountModel
        .findOne({
            username: username,
            password: password,
        })
        .then(data => {
            if (data) {
                let token: string = jwt.sign({ _id: data._id }, 'mk')
                return res.json({
                    message: "sucess",
                    token: token,
                })
            }
            else {
                return res.json("Failed")
            }
        })
        .catch(err => res.status(500).json(`loi server ${err}`))
})

AuthenticationRouter.get('/private/',
    (req: Request, res: Response, next: NextFunction) => {
        var token: string = req.cookies.token
        jwt.verify(token, 'mk', function (err, decoded) {
            if (err) return res.redirect('/Authentication')
            return next()
        })
    },
    (req: Request, res: Response, next: NextFunction) => { res.json('welcome') },
)

export { AuthenticationRouter }