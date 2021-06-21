const mongoose = require('mongoose')
const moment = require('moment')

const uuid = require('uuid').v4()

let today = moment().format('MMMM Do YYYY,dddd');
let yesterday =  moment().subtract(1, "days").format('MMMM Do YYYY, h:mm:ss a') - 1;

const Schema = mongoose.Schema

let Orders = new Schema({
    fname:{
        type:String,
        required:true,
        length:25,
        lowercase:true,
    },
    lname:{
        type:String,
        required:true,
        length:25,
        lowercase:true,
    },

    phonenumber:{
        type:Number,
        required:true,
    },

    city:{
        type:String,
        required:true,
        length:25,
        lowercase:true,
    },

    address:{
        type:String,
        required:true,
        length:25,
        
    },


    items:{
        type:[Object],
        required:false,
    },
    
    formattedDate:{
        type:Object,
        default:{
            year:moment().format('YYYY'),
            month:moment().format('MM'),
            day:moment().format('DD'),
        }
    },
    created:{
        type:String,
        default:today
    },

    delivered:{
        type:Boolean,
        default:false
    }
    

    
}, {strict:false})


module.exports = mongoose.models.orders || mongoose.model('orders', Orders)

