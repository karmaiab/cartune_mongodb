const mongoose=require('mongoose');

const cars = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    model:{
        required:true,
        type:String,
    },
    year:{
        required:true,
        type:Number
    }
},
{
    timestamps: false,
    versionKey: false
});

cars.methods.toCarResponse = async function(){
    return{
        name: this.name,
        model: this.model,
        year: this.year
    }
};

module.exports = mongoose.model('Cars', cars)