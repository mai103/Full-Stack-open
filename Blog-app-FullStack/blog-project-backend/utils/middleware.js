import jwt from 'jsonwebtoken';
import User from '../models/users.js';
//middleware error handling
const errorHandler =(error, req, res, next)=>{
    console.log(error.message);
    if(error.name === "CastError"){
        return res.status(400).send({error: "malformed id"})
    }else if(error.name === "ValidationError") {
        return res.status(400).send({error: error.message})
    }else if(error.name === "JsonWebTokenError"){
        return res.status(401).send({error:"Invalid token"})
    }

    next(error)
}
const tokenExtractor =(req,res,next)=>{
      const authorization = req.headers.authorization;
    
      if(authorization && authorization.startsWith("Bearer")){
        req.token = authorization.replace("Bearer ", "");
      }else{
          req.token = null;
      }
      next();
}

const userExtractor = async(req,res,next)=>{
    if(req.token){
         const decodedToken = jwt.verify(req.token,process.env.SECRET)
        
        if(decodedToken.id){
            req.user = await User.findById(decodedToken.id)
        }
    }
    next();
}


export {errorHandler, tokenExtractor,userExtractor}