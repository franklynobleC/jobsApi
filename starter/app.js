
require('dotenv').config()   // get  env file
//async errors 
require('express-async-errors');

//extra security packages 
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('xss-clean')



const  express = require('express');

const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
const app = express();
  //db connection
const connectDB = require('./db/connectdb')
//error handler
const notFoundMiddleware = require('./middleware/error-handlers');
const { default: mongoose } = require('mongoose');
const authenticationMiddleware = require('./middleware/auth');
// const errorMiddleware = require('./middleware/not-found')

//middleware 
  
// app.get('/', (req, resp) => {
//     resp.send("<h1>jobs get test <h1>");
// })


app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,// 15  minutes 
    max: 100, // limit each IP to 100 request per windowsMs
}))
app.use(express.json()); // send  the response as json
app.use(helmet())
app.use(cors())
app.use(xss())


//routes 

 app.use('/api/v1/auth', authRouter)
 app.use('/api/v1/jobs', authenticationMiddleware, jobsRouter)
 

//if error, use  this route 
app.use(notFoundMiddleware)
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

