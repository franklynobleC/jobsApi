const mongoose = require('mongoose'); // import  mongoos  for  schema
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken')

 const UserSchema = new mongoose.Schema ({
    name: {
        type: String ,
        required: [true, 'please provide name'],
        minlength: 3,
        maxlength: 50,
        
    },
    email: {
        type:String,
        required: [true, 'please enter email address'],
        minlength: 3,
        maxlength: 50,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
            'please provide a valid email',      
    ],
    unique: true,
},
password: {
    type: String ,
    required: [true, 'please provide password'],
    minlength: 6,
    // maxlength: 12,   
    
},
 
 })
 //
 //use  mongoose  middleware for password hashing
UserSchema.pre('save', async function () {
    const salt  = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
 
})
UserSchema.methods.getName = function () {

    return this.name
}

 //use  mongoose  middleware to  create JWT
UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    })
}

//to check  user  password, matching
UserSchema.methods.ComparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}


 module.exports = mongoose.model('User', UserSchema);

