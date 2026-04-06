import { Router } from "express";
import bcrybt from "bcrypt";
import User from "../models/users.js";

const userRouter =Router();

//get all users
userRouter.get("/", async (req, res)=>{
    const users =await User.find({}).populate('blogs', {title:1, author:1, url:1});
    res.json(users)
});


//add new user
userRouter.post("/", async (req, res)=>{
    const {username, name, password} =req.body;
    
        if(!username || !password){
        return res.status(400).json({error: "username and password are required!"})
    }
    if(username.length < 3 || password.length < 3){
        return res.status(400).json({error: "username and password must be at least 3 characters long!"})
    }

    const existingUSer = await User.findOne({username})
    if(existingUSer){
        return res.status(400).json({error: "username must be unique!"})
    }

    const passwordHash = await bcrybt.hash(password, 10);

    const user = new User({
        username, name, passwordHash
    })

    const savedUser =await user.save();

    res.status(201).json(savedUser);
})

export default userRouter;