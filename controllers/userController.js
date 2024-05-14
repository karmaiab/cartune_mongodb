const User=require("../models/userModel");
const asyncHandler=require('express-async-handler');
const bcrypt=require('bcrypt');

const regUser=asyncHandler(async (req,res)=>{
    const email=req.body.email;
    const username=req.body.username;
    const password=req.body.password;

    if(!email || !username || ! password){
        return res.status(400).json({message:"Все поля должны быть заполнены!"});
    }
    const hashedPass=await bcrypt.hash(password,10);
    const userObject={
        "email":email,
        "username":username,
        "password":hashedPass,
    };

    const createdUser= await User.create(userObject);

    if(createdUser){
        res.status(201).json({
            user:await createdUser.toUserResponse()
        })
    }else{
        res.status(422).json({
            errors:{
                body:"Ошибка при создании пользователя"
            }
        });
    }
});

const allUsers=asyncHandler(async(req,res)=>{
    const data = await User.find();
    return res.status(200).json({
            user:await Promise.all(data.map(async user=>{
                return await user.toUserResponse();
            })),    
    });
});

module.exports={
    regUser,
    allUsers
}