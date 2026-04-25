const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// GET all wishlist items
router.get('/', async (req, res) => {
  try {
    const items = await Wishlist.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add to wishlist
router.post('/', async (req, res) => {
  try {
    const exists = await Wishlist.findOne({ productId: req.body.productId });
    if (exists) return res.status(400).json({ error: 'Already in wishlist' });
    const item = new Wishlist(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE from wishlist
router.delete('/:id', async (req, res) => {
  try {
    const item = await Wishlist.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
