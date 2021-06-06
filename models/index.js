
let admin = null
let orders = null
let items = null
try{
    admin = require('./schemes/admin')
    orders = require('./schemes/orders')
    items = require('./schemes/items')
    
}catch(err){
    admin = require('./schemes/admin')
    orders = require('./schemes/orders')
    items = require('./schemes/items')
}

module.exports = {
    Admin:admin,
    Orders:orders,
    Items:items,
}