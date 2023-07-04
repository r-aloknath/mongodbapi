const mongoose = require('mongoose')
const bCrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }
})
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        console.log("Inside ismodified condition", bCrypt.hash(this.password, 12));
        this.password = await bCrypt.hash(this.password, 12);
        this.cpassword = await bCrypt.hash(this.cpassword, 12)
    }
    console.log(this.password);
    next();
});
const User = mongoose.model('USER',userSchema)
module.exports = User;