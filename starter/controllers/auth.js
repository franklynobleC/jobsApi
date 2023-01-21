const User = require('../models/UserModel')
const { StatusCodes } = require('http-status-codes')
const {BadRequestError} = require('../error')
const jwt = require ('jsonwebtoken')



const register = async (req, resp) => {
    const user = await User.create({... req.body}) // get  all data from the request  body
    const token = user.createJWT()
     
    resp.status(StatusCodes.CREATED).json({user: {name: user.name }, token })
}

    // const token = jwt.sign({userId:user._id, name: user.name},'jwtSecret', {expiresIn: '30d'


    const login = async (req, resp) => {
    resp.send(' login user')
}


module.exports = {
    register,
    login,
}