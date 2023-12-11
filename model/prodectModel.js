const mongoose = require('mongoose');

const productSchama = new mongoose.Schema({
  name:{type:String},
  imgurl:{type:String},
  price:{type:String},
  category:{type:String},
  subCategory:{type:String},
  discription:{type:String},
  quantity:{
    type:Number,
    default:1
  }
})

module.exports = mongoose.model("productSchama",productSchama)