
require('dotenv').config()   // get  env file
//async errors 
require('express-async-errors');

const  express = require('express');

const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
const app = express();

const connectDB = require('./db/connectdb')
//error handler
const notFoundMiddleware = require('./middleware/error-handlers');
const { default: mongoose } = require('mongoose');
// const errorMiddleware = require('./middleware/not-found')

//middleware 

// app.get('/', (req, resp) => {
//     resp.send("<h1>jobs get test <h1>");
// })


app.use(express.json()); // send  the response as json

//routes 

 app.use('/api/v1/auth', authRouter)
 app.use('/api/v1/jobs', jobsRouter)
 

//if error, use  this route 
// app.use(notFoundMiddleware)
// app.use(errorMiddleware)

const port = process.env.PORT  || 3000  // if the  port is  undefined, use  port 3000

const start = async () => {
    try {
   
    //   const connect = mongoose.connect(connectDB) 
         await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is  listening ${port}...`))

    }catch(err) {
        console.log(err.message, 'error Message')
    }
}
start()

