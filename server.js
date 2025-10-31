// const express = require('express');
// const app = express();

// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Server running on port ${port}`));


const express = require('express');
const { initDb } = require('./database/connection');
const contactsRoutes = require('./routes/contacts');

const app = express();
app.use(express.json());
app.use('/contacts', contactsRoutes);

const port = process.env.PORT || 8080;

initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  }
});
