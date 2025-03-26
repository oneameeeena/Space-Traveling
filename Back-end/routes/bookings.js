const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all bookings
router.get('/', (req, res) => {
    db.query('SELECT * FROM bookings', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Create a new booking
router.post('/', (req, res) => {
    const { user_id, departure_date, destination, seat_class, status } = req.body;
    
    db.query(
        'INSERT INTO bookings (user_id, departure_date, destination, seat_class, status) VALUES (?, ?, ?, ?, ?)',
        [user_id, departure_date, destination, seat_class, status || 'confirmed'],
        (err, result) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({ 
                message: 'Booking created successfully', 
                bookingId: result.insertId 
            });
        }
    );
});

// Get booking by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    db.query('SELECT * FROM bookings WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(results[0]);
    });
});

// Update booking
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { departure_date, destination, seat_class, status } = req.body;
    
    db.query(
        'UPDATE bookings SET departure_date = ?, destination = ?, seat_class = ?, status = ? WHERE id = ?',
        [departure_date, destination, seat_class, status, id],
        (err, result) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.json({ message: 'Booking updated successfully' });
        }
    );
});

// Delete booking
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    db.query('DELETE FROM bookings WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully' });
    });
});

module.exports = router;