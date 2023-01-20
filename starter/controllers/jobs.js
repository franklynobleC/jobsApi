const getAllJobs = async (req, resp) => {
    resp.send(' get all jobs')
}
const getJob = async (req, resp) => {
    resp.send(' get job')
}


const createJob = async (req, resp) => {
    resp.send(' create job')
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