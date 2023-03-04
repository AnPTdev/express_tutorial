import express, { Express, Request, Response, NextFunction } from "express";
const app: Express = express()

import bodyParser from 'body-parser';
import { AccountModel } from './models/account';

const PAGE_SIZE = 2
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/account/', (req: Request, res: Response, next: NextFunction) => {
    var page: string = req.query.page as string;
    if (page) {
        //GET PAGE
        var _page: number = parseInt(page);
        _page < 1 ? _page = 1 : page;

        var start = (_page - 1) * PAGE_SIZE
        AccountModel
            .find({})
            .skip(start)
            .limit(PAGE_SIZE)
            .then(data => res.json(data))
            .catch(err => res.status(500).json('loi server: ' + err))

    } else {
        //GET ALL
        AccountModel.find({})
            .then(data => res.json(data))
            .catch(err => res.status(500).json('loi server: ' + err))
    }
})


app.listen(PORT, () => {
    console.log(`Socket.IO server running at http://localhost:${PORT}/`);
});