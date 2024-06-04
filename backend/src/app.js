const express = require('express');

const indexRoute = require('./routes/index');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default route
app.get('/api/v1/', (req, res) => {
  res.send('It is working!!!');
});

// Use the index route
app.use('/api/v1/', indexRoute);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

// Handle unhandled promise rejections (if any)
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1); // Exit the process on unhandled promise rejections
});

