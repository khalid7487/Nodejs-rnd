import  express  from "express";
import connectionWithDb from "./mongo";
import configure from "./controllers";


const port = 7005;
const app = express();

app.use(express.json());

connectionWithDb();

configure(app);


app.listen(port,()=>{
    console.log("Listing to port " + port);
});