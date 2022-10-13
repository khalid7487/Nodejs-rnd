import  express  from "express";
import connectionWithDb from "./mongo";
import configure from "./controllers";
import { handleErrors } from './middlewares/handleErrors';

import winston from "winston";
import expressWinston from "express-winston";
import winstonFile from "winston-daily-rotate-file"
import winstonMongo from "winston-mongodb";
import {  ElasticsearchTransport} from "winston-elasticsearch";

const port = 7005;
const app = express();

app.use(express.json());

const processRequest = async(req, res, next) => {
     let correlationId = req.headers['x-correlation-id'];

     if(!correlationId){
        correlationId =Date.now().toString();
        req.headers['x-correlation-id'] = correlationId;
     }

     res.set('x-correlation-id', correlationId);

     return next();
}

app.use(processRequest);

connectionWithDb();

configure(app);
app.use(handleErrors);

app.listen(port,()=>{
    console.log("Listing to port " + port);
});