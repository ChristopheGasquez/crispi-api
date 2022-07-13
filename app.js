import express from 'express';
import routes from './src/routes/index.js';
import database from './src/utils/database.js';
import { Response } from './src/models/response.model.js';
import CONST from './src/constants/response.constant.js';

// Connect Database
database.connectDB();

// Define port.
const PORT = process.env.PORT || 3001;

// Create app.
const app = express();

// Use express json middleware.
app.use(express.json());

// Use routes middleware.
app.use('/', routes.home);
app.use('/authentication', routes.authentication);
app.use('/credentials', routes.credentials);
app.use('/rights', routes.rights);

// Static files.
app.use(express.static('dist'));

// Page not found.
app.use((_, res) => {
  const response = new Response(CONST.error.notFound);
  return response.send(res);

});

// Start server on specified port.
app.listen(PORT, () => {
  console.log('Crispi-API is started on port >>>>', PORT);
});
