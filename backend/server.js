

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workout')

// express app
const app = express()

// middleware
app.use(express.json()) //this middleware to make the req obj a json so you can access its body

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })  //install dotenv to use private environment variables so its not seen 
    //process.env.xxx for variables from ENV file

  })
  .catch((err) => {
    console.log(err)
  }) 