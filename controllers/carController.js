const Car=require("../models/carModel");
const asyncHandler=require('express-async-handler');

const createCar = asyncHandler(async(req, res)=>{
    const name = req.body.name
    const model = req.body.model
    const year = req.body.year
    if (!name || !model|| !year) {
        res.status(400).json({message: "Все поля должны быть заполнены!"});
    }

    const carObject = {
        "name":name,
        "model":model,
        "year":year
    };
    const createdCar = await Car.create(carObject);

    if(createdCar){
        res.status(201).json({
            car:await createdCar.toCarResponse()
        })
    }else{
        res.status(422).json({
            errors:{
                body:"Ошибка при создании статьи!"
            }
        });
    }
});

module.exports = {
    createCar
}