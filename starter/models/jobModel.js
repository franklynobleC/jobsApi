const mongoose = require('mongoose')
   

const JobsSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 50,
    },
 position : {
    type: String,
    required: [true, 'please provide  position'],
    maxlength: 100,
 },
 status: {
    type: String ,
    enum: ['interview','pending', 'declined'],
    default: 'pending',
 },
  
 //created  jobs referrences  Each User here
 createdBy: {
    type:mongoose.Types.ObjectId,
    ref: 'User',  
    required:[true, 'please provide']
 }
}, {
    timestamps:true})

  
    
    module.exports = mongoose.model('Job', JobsSchema);