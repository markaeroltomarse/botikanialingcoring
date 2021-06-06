const router = require('express').Router()
const Models = require('../../models')
const {Admin, Orders, Items} = Models

const uuid = require('uuid')
const moment = require('moment')



router.post('/purchaseItem', async (req, res) => {
    try{
        console.log(req.body.customer)

        for(const item of req.body.customer.items){
            await Items.updateOne({_id:item._id}, {$inc:{ qty: -item.selectedqty}})
        }

        let neworder = new Orders(req.body.customer)

        neworder.save()
        

        
        res.json({
            msg:'Order done!',
            result:false,
        })
    }catch(err){
        console.log(err)
        res.json({
            msg:err,
            result:false,
        })
    }
})

module.exports = router