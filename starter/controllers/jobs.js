const Job = require('../models/jobModel')
const {BadRequestError, NotFoundError} = require('../error')
const { StatusCodes } = require('http-status-codes')

const getAllJobs = async (req, resp) => {

    const jobs = await Job.find({createdBy: req.user.userId }).sort('createdAt')
    resp.status(StatusCodes.OK).json({jobs, count: jobs.length})
    
}
const getJob = async (req, resp) => {
    
      console.log('get a single Job')
    const{ user: {userId}, params: {id: jobId},} = req    // get the entire document and  destructure  the details  into the params


     const singleJob = await Job.findOne({
        _id: jobId,
         createdBy: userId,
     })
     if (!singleJob) {
      throw new NotFoundError('No job  with', jobId)
     }
     console.log(singleJob)
    
    resp.status(StatusCodes.OK).json({singleJob})
}


const createJob = async (req, resp) => {
    console.log('Create Jobs route')
    //get the user from  req.user, the  get the id
    req.body.createdBy = req.user.userId   // pass the user job object  to the createdby object

    const job = await Job.create(req.body)
    resp.status(StatusCodes.CREATED).json({job})
}

const deleteJob = async (req, resp) => {
     req.body.createdBy = req.user.userId
    
     // get the single  value  of  object and  delete
     const job = await Job.findOneAndDelete(req.body)
     resp.status(StatusCodes.OK).json(job)

}


const updateJob = async (req, resp)=> {
    // distructure the  entire object  into the  following request
    const {
        body: {company,position},
        user: {userId },
        params: {id: jobId },
    } = req

    if (company === '' || position === '') {
        throw new BadRequestError("Company  or  position  can not be  empty")
    }
       const job = await Job.findOneAndUpdate({_id:jobId,createdBy:userId},req.body, {new:true, runValidators: true})

      if(!job) {
        throw new NotFoundError(`no job with id ${jobId}`)
      }
    //    resp.send('update job')
    resp.status(StatusCodes.OK).json({job})
}

module.exports = {
    getAllJobs,
    createJob,
    getJob,
    deleteJob,   
    updateJob
}