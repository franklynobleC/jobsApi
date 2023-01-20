const User = require('../models/UserModel')
const { StatusCodes } = require('http-status-codes')
const {BadRequestError} = require('../error')
const bcrypt = require('bcryptjs');


const register = async (req, resp) => {
 const {name, email, password} = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)

  const tempUser = {name,email,password: hashedPassword}
// 
//
     // console.log('post Method called')
    
     const user = await User.create({...tempUser}) // get  all data from the request  body
     
    resp.status(StatusCodes.CREATED).json({user})
}
const login = async (req, resp) => {
    resp.send(' login user')
}


module.exports = {
    register,
    login,
}