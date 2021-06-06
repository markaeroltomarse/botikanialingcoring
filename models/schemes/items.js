const mongoose = require('mongoose')
const moment = require('moment')

const uuid = require('uuid').v4()

let today = moment().format('MMMM Do YYYY, h:mm:ss a');
let yesterday =  moment().subtract(1, "days").format('MMMM Do YYYY, h:mm:ss a') - 1;

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
        type:Number,
        required:false,
        default:0,
    },

    created:{
        type:String,
        default:today
    },

  

    
}, {strict:false})


module.exports = mongoose.models.items || mongoose.model('items', Items)

