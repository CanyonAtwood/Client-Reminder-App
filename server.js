const express = require('express');
const routes = require("./routes")


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

app
// .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
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
