
//middleware error handling
const errorHandler =(error, req, res, next)=>{
    console.log(error.message);
    if(error.name === "CastError"){
        return res.status(400).send({error: "malformed id"})
    }else if(error.name === "ValidationError") {
        return res.status(400).send({error: error.message})
    }else if(error.name === "jsonWebTokenError"){
        return res.status(401).send({error:"Invalid token"})
    }

    next(error)
}



export default errorHandler