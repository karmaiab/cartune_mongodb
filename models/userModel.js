const mongoose=require('mongoose');

const users=new mongoose.Schema({
    email:{
        required:true,
        type:String,
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    username:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        type: String,
        required: true
    }
},
{
    timestamps: false,
    versionKey: false
});

users.methods.toUserResponse = async function() {
    if (this.subscription==null) {
        return {
            username: this.username,
            email: this.email,
        }
    }
};

module.exports = mongoose.model('Users', users)