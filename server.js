const express = require('express');
const routes = require("./routes");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const router = express.Router();

router.get('/',function(req,res){
    res.sendFile(__dirname+'/login/index.html');
    //__dirname : It will resolve to your project folder.
});


// set up swagger documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

// add dotenv
const dotenv = require('dotenv');
dotenv.config()

// connect to the database
mongoose.connect(process.env.mongodb_uri,
    {useNewUrlParser: true}, (err, res)=> {
        if (err) {
            console.log('Connection failed: ' + err);
         }
         else {
            console.log('Connection to database successful!');
         }
    })

// start express app
const app = express()
const port = 3000

// 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', router);

app
.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
.use(bodyParser.json())
.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
next();
})

// add our routes
app.use('/', routes)

process.on('uncaughtException', (err, origin) => {
console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});


const session = require('express-session');

//app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));
/*  PASSPORT SETUP  */

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

//app.set('view engine', 'ejs');

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

/*  Google AUTH  */
 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.OAUTH_SECRET;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL:'https://client-reminder.onrender.com/auth/google/callback'

    //"http://localhost:3000/auth/google/callback"
    
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


app.listen(port, ()=> {
console.log(`Listening on port ${port}`)
})




