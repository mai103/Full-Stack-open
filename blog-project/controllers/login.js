import jwt from "jsonwebtoken";
import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/users.js";

const loginRouter =Router();

loginRouter.post("/", async(req,res) =>{
    const {username, password} = req.body;
    const user = await User.findOne({username})
    const correctPAssword = user === null? false : await bcrypt.compare(password, user.passwordHash);

    if(!(user && correctPAssword)){
        return res.status(401).json({error: "Invalid username or password!"})
    }

    const userToken={
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userToken, process.env.SECRET);
    res.status(200).send({token, username: user.username, name:user.name});
})

export default loginRouter;