import express from "express";
import configure from "./controllers";
import { connectWithDb, uri } from "./mongo";

import { handleErrors, processRequest } from "./middlewares/index";
import { infoLogger, errorLogger } from "./logger";

import dotenv from "dotenv";

dotenv.config()

console.log(process.env.test)

const app = express();

app.use(express.json());



app.use(processRequest);

connectWithDb();

if(process.env.ENVIRONMENT != "TEST")
    app.use(infoLogger(uri));

configure(app);

if(process.env.ENVIRONMENT != "TEST") 
    app.use(errorLogger(uri));

app.use(handleErrors);

export default app;