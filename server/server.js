
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport')
const app = express()
const PORT = process.env.PORT || 8080

// Middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())
app.use(
  session({
    secret: process.env.APP_SECRET || 'this is the default passphrase',
    store: new MongoStore({mongooseConnection: dbConnection}),
    resave: false,
    saveUninitialized: false
  })
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser




/* Express app ROUTING */
app.use('/auth', require('./auth'))
app.use('/todo', require('./todo'))

// Error handler 
app.use(function (err, req, res, next) {
  console.log('ERROR')
  console.error(err.stack)
  res.status(500)
})

// Starting Server 
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`)
})
