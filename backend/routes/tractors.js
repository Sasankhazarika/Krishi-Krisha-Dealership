const express = require('express');
const router = express.Router();
const Tractor = require('../models/Tractor');

// GET all tractors
router.get('/', async (req, res) => {
  try {
    const { brand, minPrice, maxPrice } = req.query;
    let filter = {};
    if (brand) filter.brand = brand;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    const tractors = await Tractor.find(filter).sort({ createdAt: -1 });
    res.json(tractors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single tractor
router.get('/:id', async (req, res) => {
  try {
    const tractor = await Tractor.findById(req.params.id);
    if (!tractor) return res.status(404).json({ error: 'Tractor not found' });
    res.json(tractor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new tractor (admin)
router.post('/', async (req, res) => {
  try {
    const tractor = new Tractor(req.body);
    await tractor.save();
    res.status(201).json(tractor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update tractor (admin)
router.put('/:id', async (req, res) => {
  try {
    const tractor = await Tractor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tractor) return res.status(404).json({ error: 'Tractor not found' });
    res.json(tractor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE tractor (admin)
router.delete('/:id', async (req, res) => {
  try {
    const tractor = await Tractor.findByIdAndDelete(req.params.id);
    if (!tractor) return res.status(404).json({ error: 'Tractor not found' });
    res.json({ message: 'Tractor deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
