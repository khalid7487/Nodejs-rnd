import express from "express";
import configure from "./controllers";
import { connectionWithDb, uri } from "./mongo";
import { handleErrors } from "./middlewares/handleErrors";


const port = 3000;
const app = express();

app.use(express.json());

const processRequest = async (req, res, next) => {
    let correlationId = req.headers['x-correlation-id'];
    if (!correlationId) {
        correlationId = Date.now().toString();
        req.headers['x-correlation-id'] = correlationId;
    }

    res.set('x-correlation-id', correlationId);

    return next();
}

app.use(processRequest);

connectionWithDb();

app.use(infoLogger);

configure(app);

app.use(errorLogger);

app.use(handleErrors);

app.listen(port, () => {
    console.log("Listening to port " + port);
});
