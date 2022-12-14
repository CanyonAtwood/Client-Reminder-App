const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
      title: 'My API',
      description: 'Description',
    },
    host: 'client-reminder.onrender.com',
    schemes: ['https'],
  };


const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js')
})