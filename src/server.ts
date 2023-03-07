import express, { Express, Request, Response, NextFunction } from "express";
const app: Express = express()
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

import { AuthenticateRouter } from "./routers/authenticate";
app.use('/authenticate/', AuthenticateRouter)

import { TaskRouter } from "./routers/task";
app.use('/task/', TaskRouter)


app.listen(PORT, () => {
    console.log(` server running at http://localhost:${PORT}/`);
});