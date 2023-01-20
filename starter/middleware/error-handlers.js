const CustomAPIError = require("../error");
const {StatusCodes} = require('http-status-codes')

//errorHandler func
const errorHandlerMiddleware = async(err, req, resp, next) => {
    if (err instanceof CustomAPIError) {
        return  resp.status(err.statusCode).json({mesg: err.message})
    }
    return resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "something went wrong, please try again"})
}

module.exports = errorHandlerMiddleware;