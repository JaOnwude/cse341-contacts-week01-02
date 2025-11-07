const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for contacts management',
    version: '1.0.0',
  },
  host: 'https://cse341-contacts-week01-02.onrender.com',
  schemes: ['http'],
  basePath: '/contacts',
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger JSON generated!');
  require('./server.js');
});