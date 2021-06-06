const router = require('express').Router()
const Models = require('../../models')
const {Orders, Items, Admin} = Models

const uuid = require('uuid')
const moment = require('moment')




router.post('/newitem', async (req, res) => {
    try{
        console.log('NEW ITEM', req.body.newitem)
        let newitem = new Items(req.body.newitem)

        newitem.save()

        res.json({msg:'New item saved!', newitem, result:true})
    }catch(err){
        console.log(err)
        res.json({
            msg:err,
            result:false
        })
    }
})


router.get('/getitems', async (req,res) => {
    let items = await Items.find()

    res.json({items})
})


router.post('/updateqty', async (req, res) => {
    try{
        console.log(req.body)

        for (const item of req.body) {
             await Items.updateOne({ _id: item._id }, { $set:{ qty: item.qty }})
        }

        res.json({
            result:true,
            msg:'Quantities successfully updated!'
        })
    }catch(err){
        console.log(err)
        res.json({
            msg:err,
            result:false,
        })
    }
})


router.post('/deleteitem', async (req, res) => {
    try{
        console.log(req.body)

        await Items.remove({_id:req.body.item._id})

        res.json({
            result:true,
            msg:'Item Deleted Successfully.'
        })
    }catch(err){
        console.log(err)
        res.json({
            msg:err,
            result:false,
        })
    }
})


router.get('/sales', async (req, res) => {
    try{
        let days = getCurrentWeek()

        let orders = await Orders.find()
        let items = await Items.find()
        
        let weekvalue = []
        days.forEach(day => {
            let oneday = orders.filter(order => order.created == day & order.delivered)
            let peritems = oneday.map(order => order.items.map(item => (item.selectedqty * item.price)))
            peritems = peritems.map(arr => arr.reduce((a, b) => a + b, 0))
            
            peritems = peritems.reduce((a, b) => a + b, 0)
            weekvalue.push(peritems)
        })

        console.log(weekvalue)

        
       
        console.log("ITEMS", items)
        res.json({
            result:true, 
            weekvalue, 
            orders:orders.length,
            product:items.length,
            items,
        })
    }catch(err){
        console.log(err)
        res.json({msg:err, result:false})
    }
})

router.get('/orders', async (req, res) => {
    try{
        let orders = await Orders.find()
        res.json({orders})
    }catch(err){
        console.log(err)
        res.json({msg:err, result:false})
    }
})


router.post('/orders/delivernow', async (req, res) => {
    console.log(req.body)
    let delivered = await Orders.updateOne({_id:req.body._id}, {$set:{delivered: true}})

    res.json({delivered})
})

function getCurrentWeek() {
    var currentDate = moment();

    var weekStart = currentDate.clone().startOf('isoWeek');
    var weekEnd = currentDate.clone().endOf('isoWeek');

    var days = [];

    for (var i = 0; i <= 6; i++) {
        days.push(moment(weekStart).add(i, 'days').format("MMMM Do YYYY,dddd"));
    }
    
    return days

}

module.exports = router