const express = require('express');
require('express-async-errors');

const router = express.Router()

 


// register controller handlers 
const {
        getAllJobs,
        getJob,
        createJob,
        updateJob,
        deleteJob,
    } = require('../controllers/jobs')


  
 router.route('/').post(createJob).get(getAllJobs)   
 router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)
module.exports = router   // export router
    