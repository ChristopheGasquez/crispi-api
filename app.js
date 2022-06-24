import express from 'express';

// Define port.
const PORT = process.env.PORT || 3001

// Create app.
const app = express();


// Start server on specified port.
app.listen(PORT, () => {
   console.log('Crispi-API is started on port >>>>', PORT);
});
