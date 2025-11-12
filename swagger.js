// const swaggerAutogen = require('swagger-autogen')();

// const doc = {
//   info: {
//     title: 'Contacts API',
//     description: 'API for contacts management',
//     version: '1.0.0',
//   },
//   host: 'cse341-contacts-week01-02.onrender.com',
//   schemes: ['https'],
//   basePath: '/contacts',
// };

// const outputFile = './swagger.json';
// const endpointsFiles = ['./routes/contacts.js'];

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//   console.log('Swagger JSON generated!');
//   require('./server.js');
// });



const swaggerAutogen = require('swagger-autogen')();

// Detect environment
const IS_RENDER = process.env.RENDER === 'true';
const PORT = process.env.PORT || 8080;
const HOST = IS_RENDER 
  ? 'cse341-contacts-week01-02.onrender.com' 
  : `localhost:${PORT}`;

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts',
    version: '1.0.0',
  },
  host: HOST,
  schemes: [IS_RENDER ? 'https' : 'http'],
  basePath: '/contacts',
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log(`Swagger JSON generated for: ${IS_RENDER ? 'https' : 'http'}://${HOST}`);
  require('./server.js');
});