const express = require("express")
const app = express()
const dotenv = require("dotenv")
const port = process.env.PORT || 5000
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const router = require("./routes")
const passport = require("passport")
const session = require('express-session')
const authrouter = require("./routes/auth")
const storiesRouter = require("./routes/stories")
const mongoStore = require("connect-mongo")(session)
const methodOverride = require("method-override")

dotenv.config()
const db = process.env.MONGO_URL;
const { formatDate,
  stripTags,
  truncate,
  editIcon,
  select, } = require("./helpers/hbs")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))



require("./passport")(passport)

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => console.log(`b connected `))




app.engine(
  '.hbs',
  exphbs({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    }, defaultLayout: 'main', extname: '.hbs'
  })
)
app.set('view engine', '.hbs')
app.use(express.static("assets"))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new mongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})
app.use(router)
app.use("/auth", authrouter)
app.use("/stories", storiesRouter)



app.listen(port, () => console.log(`server is running at ${port} !!!`))