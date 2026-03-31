import Users from "../model/users.js";


//get all users
async function getAllUsers(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    try {
        const users = await Users.find({}).skip((page-1)* limit).limit(limit);

        return res.json({page, limit, data: users});
    }
    catch (error) {
        next(error)
    }
}


//get user by id

async function getUserById(req, res, next) {

    try {
        const userById = await Users.findOne({ _id: req.params.id })
        res.send(userById)
    } catch (error) {
        next(error)
    }
}


//create new user

async function createUser(req, res, next) {
    try {
        const newUser = await Users.create(req.body);
        res.send(newUser)
    } catch (error) {
        next(error)
    }

}

//update user by id

async function updateUserByID(req,res,next) {
    try {
        
        const upadatedUser =await Users.findOneAndUpdate({_id: req.params.id}, req.body, {new:true});
        
        res.send(upadatedUser)
    } catch (error) {
        next(error)
    }
}


//delete user by id
async function deleteUserByID(req,res,next) {
    try {
        
        const deletedUser =await Users.findOneAndDelete({_id: req.params.id});

        if(!deleteUserByID){
            res.status(404).json({message: "User not found!"})
        }
        
         res.json({message: "User deleted successfully"});
    } catch (error) {
        next(error)
    }
}




export {getAllUsers, getUserById, createUser, updateUserByID, deleteUserByID}