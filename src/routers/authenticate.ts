import { Router, Request, Response, NextFunction } from 'express';
import { AccountModel } from '../models/account';

import cookieParser from 'cookie-parser';
import path from 'path';
import jwt, { JwtPayload } from 'jsonwebtoken';

const AuthenticateRouter = Router();

AuthenticateRouter.use(cookieParser())

AuthenticateRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile('login.html', { root: 'pages' })
})


//*Login
AuthenticateRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
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

AuthenticateRouter.get('/home',
    (req: Request, res: Response, next: NextFunction) => {
        let token: string = req.cookies.token;
        let decodedToken = jwt.verify(token, 'mk')
        AccountModel.find({ _id: decodedToken['_id'] }).then(function (data) {
            if (data.length == 0) {
                return res.redirect('/login')
            } else {
                if (data[0].role == 0) {
                    next()
                } else {
                    return res.redirect('/login')
                }
            }
        })
    },
    (req: Request, res: Response, next: NextFunction) => {
        res.sendFile('home.html', { root: 'pages' })
    })

AuthenticateRouter.post('/edit',
    (req: Request, res: Response, next: NextFunction) => {
        let token = req.headers.cookie.split("=")[1];
        console.log(token)
        let decodedToken = jwt.verify(token, 'mk');
        AccountModel.find({ _id: decodedToken['_id'] }).then(function (data) {
            if (data.length == 0) {
                return res.redirect('/login')
            } else {
                if (data[0].role == 0) {
                    next()
                } else {
                    return res.json(
                        { error: true, message: "ban khong co quyen sua" }
                    )
                }
            }
        })
        next()
    },
    (req: Request, res: Response, next: NextFunction) => {
        res.json('sucess!')
    },)

AuthenticateRouter.get('/private/',
    (req: Request, res: Response, next: NextFunction) => {
        var token: string = req.cookies.token
        jwt.verify(token, 'mk', function (err, decoded) {
            if (err) return res.redirect('/Authentication')
            return next()
        })
    },
    (req: Request, res: Response, next: NextFunction) => { res.json('welcome') },
)

export { AuthenticateRouter }