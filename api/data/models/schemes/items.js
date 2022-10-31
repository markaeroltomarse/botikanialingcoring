const mongoose = require('mongoose')
const moment = require('moment')

const uuid = require('uuid').v4()


const Schema = mongoose.Schema

let Items = new Schema({
    name:{
        type:String,
        required:true,
    },

    content:{
        type:String,
        required:true,
    },

    itemcategory:{
        type:String,
        required:true,
    },

    company:{
        type:String,
        required:true,
    },
    
    price:{
        type:Number,
        required:true,
    },

    qty:{
        type:Array,
        required:false,
        //{date, qty}
    },

    percentOff:{
        type:Number,
        required:false,
        default:0,  
    },

    expirationDate:{
        type:String,
        required:false,
    },


    
}, {strict:true, timestamps: true})


module.exports = mongoose.models.items || mongoose.model('items', Items)

