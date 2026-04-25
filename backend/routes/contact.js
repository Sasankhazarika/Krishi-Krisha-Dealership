const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Submit a contact query
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ success: true, message: 'Query submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all queries (for admin)
router.get('/', async (req, res) => {
  try {
    const queries = await Contact.find().sort({ createdAt: -1 });
    res.json(queries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
