const mongoose = require('mongoose');
const Schema = mongoose.Schema;  

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    reg_no:{
        type: String,
        default: ""
    },
    password:{
        type: String,
        required: true,                                        
    },
    role:{
        type: Array,
        required: true,
        default:[3],
    }
},
{
    versionKey: false,
    timestamps:true
}
);

module.exports = mongoose.model("User",UserSchema)