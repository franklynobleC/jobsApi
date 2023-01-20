// const router = require("../routes/main")
  const jwt = require('jsonwebtoken')

  const {UnauthenticatedError} = require('../error')


  const authenticationMiddleware = async (req, resp, next) => {
    console.log(req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new UnauthenticatedError('No Token')
    }      
    //get the second value from the token
    
     const token = authHeader.split(' ')[1]

  try {
    //verify  webToken to ensure it  matches the authenticated user
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
    //destructures  the  id  and  username  from the  decoded payload
    const {id, username} = decoded  // destructire  this  object and  get two values from
   
    req.user = {id, username}
    next()
  //  resp.status(200).json({msg: `Hello, ${decoded.payload}`, secret: `Here  is  your auhtorized data, your luck number is ${luckyNumber}` })
  }catch(err) {
    throw new UnauthenticatedError('Not authorize  to access this route')
  } 
  
    // use  the next  to  pass through the next page
  }


  module.exports = authenticationMiddleware;

    
