const express = require('express');
const router = express.Router();
const db = require('../database');

// User registration
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    
    db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password],
        (err, result) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({ 
                message: 'User registered successfully', 
                userId: result.insertId 
            });
        }
    );
});

// User login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    db.query(
        'SELECT id, name, email FROM users WHERE email = ? AND password = ?',
        [email, password],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            res.json({ 
                message: 'Login successful', 
                user: results[0] 
            });
        }
    );
});

// Get user bookings
router.get('/:id/bookings', (req, res) => {
    const { id } = req.params;
    
    db.query(
        'SELECT * FROM bookings WHERE user_id = ?',
        [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        }
    );
});

module.exports = router;