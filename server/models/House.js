const mongoose=require("mongoose")

const HouseSchema=new mongoose.Schema({
    title:{type:String, required:true},
    address:{type:String,required:true},
    homeType:String,
    price:{type:Number, required:true},
    image:String,
    yearBuilt:Number,
    description:String
})

module.exports=mongoose.model("House",HouseSchema
)