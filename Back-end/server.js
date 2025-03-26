const express = require('express');
const cors = require('cors');
const db = require('./database');
const bookingRoutes = require('./routes/bookings.js');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
// Test database connection
db.getConnection((err, connection) => {
    if (err) {
      console.error('Database connection failed:', err);
      return;
    }
    console.log('Connected to database');
    connection.release();
  });

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Dubai to the Stars - Space Travel Booking API');
});

// Start server
app.listen(3000, () => {  // Changed from 5000 to 3000
    console.log(`Server running on port 3000`);
  });


process.on('SIGTERM', () => {
    server.close(() => {
    console.log('Server stopped');
        });
  });