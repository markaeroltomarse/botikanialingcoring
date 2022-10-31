const router = require("express").Router();
const authController = require("./controllers");

router.get("/insertAdmin", authController.insertAdmin);

router.post("/login", authController.login);

// router.post('/signup/sendcode', async (req, res) => {
//     try{

//         const {code, email} = req.body
//         console.log(req.body)
//         if(isEmailExist(email) == true) {
//             return res.json({msg:"Your email is already exist.", result:false})
//         }
//         console.log(req.body)
//         const message = {
//             from: 'marktomarse@gmail.com', // Sender address
//             to: email,         // List of recipients
//             subject: 'Account Verificationn', // Subject line
//             text: 'hello, this is your code account verification from SM CINEMA RESERVATION. \n CODE: '+code // Plain text body
//         };
//         transport.sendMail(message, function(err, info) {
//             if (err) {
//                 console.log(err)
//                 res.json({msg:err, result:false})
//             } else {
//                 console.log(info)
//                 res.json({msg:'Your code successfuly send.'})
//             }
//         });
//     }catch(err){
//         console.log(err)
//         res.json({msg:err, result:false})
//     }
// })

// router.post('/signup/register', async (req, res) => {
//     try{
//         let newcustomer = new Customers(req.body)
//         console.log(newcustomer)
//         newcustomer.save()

//         res.json({msg:'You now registered!', user:newcustomer})
//     }catch(err){
//         res.json({msg:err, result:false})
//     }
// })

// async function isEmailExist(email){

//     let customer = await Customers.find({email:email.toLowerCase()})

//     if(customer.length > 0) {
//         return true
//     }
//     return false
// }

module.exports = router;
