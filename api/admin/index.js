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

        const {_id, items} = req.body
        for (const item of items) {
             await Items.updateOne({ _id, "qty.date":item.date}, { $set:{ "qty.$.qty": item.qty }})
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
        console.log(days)
        let orders = await Orders.find({delivered:true})
        let items = await Items.find()
        
        let weekvalue = []
        days.forEach(day => {
            let total = 0
            let oneday = orders.filter(order => order.formattedDate.day == day )
            console.log('ONE DAY', oneday)
            oneday.forEach(order => {
                let mappedToTotal = order.items.map(item => item.selectedqty * item.price)
                console.log("MAPPED TOTAL", mappedToTotal)
                total += mappedToTotal.reduce((a, b) => a + b, 0)
            })
            
            
            
            weekvalue.push(total)
        })

        console.log(weekvalue)

        
       
        console.log("ITEMS", items)
        res.json({
            result:true, 
            weekvalue, 
            orders:orders,
            product:items.length,
            items,
        })
    }catch(err){
        console.log(err)
        res.json({msg:err, result:false})
    }
})


router.post('/inventory/newqty', async (req, res) => {
    try{
        console.log(req.body)
        const {_id, newitem} = req.body
        let newQTY = await Items.updateOne(
            { _id,}, 
            { $push: { qty: newitem } }
        );

        res.json({result:true, newQTY})
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
        days.push(moment(weekStart).add(i, 'days').format("DD"));
    }
    
    return days

}

module.exports = router