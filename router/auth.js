const express = require('express')
require ('../db/connection')
const User = require('../models/userSchema')
const router = express.Router();
router.get('/', (req, res) => {
    res.send(`Hello My API from router`);
})
router.post('/register', async (req, res) =>{
    const { name, email, phone, work, password, cpassword} = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({message:"You missed some data", status:"error"})
    }
    User.findOne({email:email})
    .then((userExists) => {
        if(userExists){
            return res.status(422).json({message:"User Already Exists", status:"error"})
        }
        const user = new User({name, email, phone, work, password, cpassword})
        user.save().then(()=>{
            return res.status(200).json({status:"Data saved successfuly", remarks:"success"})
        })
        .catch((error) => {
            return res.status(500).json({status:"Failed To Register",error:{type:error.name, message:error.message}, remarks:"error"})
        })
    })
    .catch((error) => {
        console.log({error});
        return res.status(500).json({status:"Something Went Wrong", remarks:"error"})
    })
})

// Login API
router.post('/signin', async (req, res) => {
    try{
        const { email, name } = req.body;
        if(!email || !name){
            return res.status(422).json({message:"You missed some data", status:"error"})
        }
        const loginUserStatus = await User.findOne({email:email});
        if(loginUserStatus){
            return res.status(200).json({status:"Logged-in successfuly", remarks:"success"})
        }else{
            return res.status(200).json({status:"User Doesn't exist", remarks:"error"})
        }
    }catch(error){
        console.log("Error While Login",error);
    }
})
module.exports = router;