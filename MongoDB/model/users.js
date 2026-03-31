import mongoose from "mongoose";

const usersShcema = mongoose.Schema({
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
    email: {type: String, unique: true ,required: true},
    age: {type:Number},
    phoneNumber: {type:String},
    address: {
        street: {type:String},
        city: {type: String},
        state: {type: String},
        zipCode: {type: String},
    },
    isActivate: {type:Boolean, default: true},
    registrationDate: {type: Date, default: Date.now}
});

const Users = mongoose.model('users', usersShcema)

export default Users;