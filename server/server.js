const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const db = require('./config/db'); // Import database connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Test database connection (optional)
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Error connecting to the database:', err));

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});