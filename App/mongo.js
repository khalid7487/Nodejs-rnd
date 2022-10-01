import mongoose from "mongoose";

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

export default connectionWithDb;