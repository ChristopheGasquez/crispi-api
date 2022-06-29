import express from 'express';
import routes from './src/routes/index.js';
import database from './src/utils/database.js';

// Connect Database
database.connectDB();

// Define port.
const PORT = process.env.PORT || 3001;

// Create app.
const app = express();

// Use express json middleware.
app.use(express.json());

// Use routes middleware
app.use('/', routes.home);
app.use('/authentication', routes.authentication);
app.use('/rights', routes.rights);

// Start server on specified port.
app.listen(PORT, () => {
  console.log('Crispi-API is started on port >>>>', PORT);
});
