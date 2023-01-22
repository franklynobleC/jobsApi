const Job = require('../models/jobModel')
const {BadRequestError, NotFoundError} = require('../error')
const { StatusCodes } = require('http-status-codes')

const getAllJobs = async (req, resp) => {
    resp.send(' get all jobs')
}
const getJob = async (req, resp) => {
    
    resp.send(' get job')
}


const createJob = async (req, resp) => {
    console.log('Create Jobs route')
    //get the user from  req.user, the  get the id
    req.body.createdBy = req.user.userId   // pass the user job object  to the createdby object

    const job = await Job.create(req.body)
    resp.status(StatusCodes.CREATED).json({job})
}

const deleteJob = async (req, resp) => {
    resp.send(' delete job')
}


const updateJob = async ()=> {
    resp.send('update job')
}

module.exports = {
    getAllJobs,
    createJob,
    getJob,
    deleteJob,
    updateJob
}