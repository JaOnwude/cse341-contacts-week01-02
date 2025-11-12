// const express = require('express'); 
// const cors = require('cors');
// const { initDb } = require('./database/connection');
// const contactsRoutes = require('./routes/contacts');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Serve Swagger UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // Routes
// app.use('/contacts', contactsRoutes);

// app.get('/', (req, res) => {
//   res.redirect('/api-docs');
// });

// const port = process.env.PORT || 8080;

// initDb((err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     app.listen(port, () => console.log(`Server running on port ${port}`));
//   }
// });

// server.js
const express = require('express');
const { initDb } = require('./database/connection');
const contactsRoutes = require('./routes/contacts');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const path = require('path');

const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

// Root route (JSON message)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Contacts API is running perfectly well 🚀' });
});

// Serve swagger.json BEFORE Swagger UI
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/contacts', contactsRoutes);

const port = process.env.PORT || 8080;

initDb((err) => {
  if (err) {
    console.error('DB Connection Failed:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      console.log(`Swagger UI: http://localhost:${port}/api-docs`);
      console.log(`swagger.json: http://localhost:${port}/swagger.json`);
    });
  }
});
