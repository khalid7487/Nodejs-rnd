import  express  from "express";
import connectionWithDb from "./mongo";
import configure from "./controllers";
import { handleErrors } from './middlewares/handleErrors';


const port = 7005;
const app = express();

app.use(express.json());

connectionWithDb();

configure(app);
app.use(handleErrors);

app.listen(port,()=>{
    console.log("Listing to port " + port);
});