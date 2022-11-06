const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const cors = require('cors')

const courserRoute = require('./routes/course')
const registeredCourses = require('./routes/registeredCourses')
const studentRoute = require('./routes/student')
const offeredCoursesRoute = require('./routes/offeredCourses')

const path = require('path')


// Custom Error Hanndler..
const errorHandler = require('./middlewares/error-handler');


const app = express()

const middlewares = [
    express.static('public'),  //make the public directory public
    express.json(),
    express.urlencoded({extended: true}),
    cors(),
    errorHandler.extra
]
app.use(middlewares)


//Router Request Handeler..
app.use('/api/course', courserRoute)
app.use('/api/registered-courses', registeredCourses)
app.use('/api/student', studentRoute)
app.use('/api/offered-courses', offeredCoursesRoute)



if(process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
// if(app.get('env') === 'development') {
//     app.use('dev')
// }

app.get('/', (req, res) => {
    res.send('<h1>Welcome to attendance management system</h1>')
})

const PORT = process.env.PORT || 8080
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p4dm8.mongodb.net/university_erp?retryWrites=true&w=majority`


// const MONGODB_URI = 'mongodb://localhost:27017/attendance_management'
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
.then(() => {
    console.log(`Database Connected`)
    app.listen(PORT, () => {
        console.log(`Listening PORT: ${PORT}`)
    })
})
.catch(e => {
    console.log(e)
})
