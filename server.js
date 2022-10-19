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

app.listen(port, ()=> {
console.log(`Listening on port ${port}`)
})
