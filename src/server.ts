import express, { Express, Request, Response, NextFunction } from "express";
const app: Express = express()
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

import { AuthenticationRouter } from "./routers/authentication";
app.use('/Authentication/', AuthenticationRouter)


app.listen(PORT, () => {
    console.log(` server running at http://localhost:${PORT}/`);
});