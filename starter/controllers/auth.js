const User = require('../models/UserModel')
const { StatusCodes } = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../error')
const jwt = require ('jsonwebtoken')



const register = async (req, resp) => {
    const user = await User.create({... req.body}) // get  all data from the request  body
    const token = user.createJWT()
     
    resp.status(StatusCodes.CREATED).json({user: {name: user.name }, token })
}

    // const token = jwt.sign({userId:user._id, name: user.name},'jwtSecret', {expiresIn: '30d'


    const login = async (req, resp) => {

        const {email, password} = req.body 

        if (!email || !password) { 
            throw  new BadRequestError('please provied email and  password')
        }
        const user = await User.findOne({email})


        if(!user) {
            throw new UnauthenticatedError('Invalid Credentials')
        }
        //comapre password , and  check  if  password  is  correct
        const isPasswordCorrect = await user.ComparePassword(password)
       
       if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
       }
        //if user exist and match create a token for  the user
        const  token = user.createJWT()
        console.log('user  logged in')

    resp.status(StatusCodes.OK).json({user:{name: user.name, token}})
}


module.exports = {
    register,
    login,
}