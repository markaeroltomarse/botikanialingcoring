const router = require("express").Router();
const mongoose = require("mongoose");
const Models = require("../../../data/models");

const { Admin } = Models;

const insertAdmin = async (req, res) => {
  let newadmin = new Admin({
    fname: "Admin1",
    lname: "Admin",
    mname: "M",
    username: "admin@gmail.com",
    password: "admin1",
    address: "21312321321",
    gender: "Male",
  });

  newadmin.save();

  return { newadmin };
};

const login = async (req, res) => {
  let admin = await Admin.findOne(req.body);
  if (!admin) {
    throw new Error("Invalid Account.");
  }
  return {
    msg: "You logged in!",
    result: true,
    type: "success",
    admin,
  };
};

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

module.exports = {
  login,
  insertAdmin,
};
