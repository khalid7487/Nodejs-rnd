import express from "express";
import configure from "./controllers";
import { connectWithDb, uri } from "./mongo";

import { handleErrors, processRequest } from "./middlewares/index";
import { infoLogger } from "./logger";

import dotenv from "dotenv";

dotenv.config()


const app = express();

app.use(express.json());



app.use(processRequest);


if(process.env.ENVIRONMENT != "TEST")
    app.use(infoLogger(uri));

configure(app);


app.use(handleErrors);

export default app;