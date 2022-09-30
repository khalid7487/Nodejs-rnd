import  express  from "express";
import models from "./models";
import mongoose from "mongoose";

const port = 7005;
const app = express();

app.use(express.json());

const log = (msg) => console.log(msg);

const uri = "mongodb://localhost:27017/parcelkoi";
const options = {};

const connectionWithDb  = () =>{
    
    mongoose.connect(uri, options, (err, db) => {
       if(err){
        console.log(err);
       }
       else log("database connected");   
    })
}

connectionWithDb();

app.get('/', (req, res) =>{
    res.send('hello viewers' + req.query.id);
})

app.post('/', (req, res) => {
    const body = req.body;

    const user = new models.User({ username: body.username, createdAt: new Date() });;

    user.save().then((savedUser) => {
        res.status(201).json({id: savedUser._id});
    }).catch((error) =>{
        res.status(500).send(error);
    })
})


app.listen(port,()=>{
    console.log("Listing to port " + port);
})

log(models);