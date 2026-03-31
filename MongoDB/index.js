// import { MongoClient } from "mongodb";

// const url ="mongodb://localhost:27017";
// const client =new MongoClient(url)

// async function connectToMongoDB(){
    
//     try{
//         await client.connect();
//         console.log("Connection to Mongo");
//     }catch(error){
//         console.log("Connected error", error);
//      }
// }
// connectToMongoDB();

//ODM --> Oblect data modelling => Mongoose
// Node // Express // Mongoose // MongoDB


import mongoose from "mongoose";
import express from "express"
import router from "./router/users.js"

const app = express()


const url = "mongodb://localhost:27017/mongo";

mongoose.connect(url).then( ()=> {console.log("Connected to MongoDB");
}).catch((error) => console.log("connection faild", error));

app.use(express.json())

app.use('/api', router);

app.get("/", async (req, res) => {
    res.send("Ok")
});

app.listen(3000, () => {console.log("server started on port 3000");
})